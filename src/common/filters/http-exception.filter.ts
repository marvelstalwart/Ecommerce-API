import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
  error?: string;
  correlationId?: string;
  stack?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request);

    // Log the error
    this.logError(exception, errorResponse, request);

    // Send response
    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(
    exception: unknown,
    request: Request,
  ): ErrorResponse {
    const timestamp = new Date().toISOString();
    const path = request.url;
    const method = request.method;
    const correlationId = request.headers['x-correlation-id'] as string;

    // Handle NestJS HTTP exceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      return {
        statusCode: status,
        timestamp,
        path,
        method,
        message: this.extractMessage(exceptionResponse),
        error: exception.name,
        correlationId,
        ...(process.env.NODE_ENV === 'development' && {
          stack: exception.stack,
        }),
      };
    }

    // Handle unknown errors (fallback)
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp,
      path,
      method,
      message: 'Internal server error',
      error: 'InternalServerError',
      correlationId,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };
  }

  private extractMessage(
    exceptionResponse: string | object,
  ): string | string[] {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      return exceptionResponse.message as string | string[];
    }

    return 'An error occurred';
  }

  private logError(
    exception: unknown,
    errorResponse: ErrorResponse,
    request: Request,
  ) {
    const { statusCode, message, correlationId } = errorResponse;
    const { method, url, body, params, query } = request;

    const logContext = {
      statusCode,
      message,
      correlationId,
      method,
      url,
      body: this.sanitizeBody(body),
      params,
      query,
    };

    if (statusCode >= 500) {
      this.logger.error(
        `${method} ${url} - ${statusCode}`,
        exception instanceof Error ? exception.stack : JSON.stringify(exception),
        JSON.stringify(logContext),
      );
    } else if (statusCode >= 400) {
      this.logger.warn(
        `${method} ${url} - ${statusCode}`,
        JSON.stringify(logContext),
      );
    }
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;

    const sensitiveFields = ['password', 'token', 'secret', 'apiKey', 'creditCard'];
    const sanitized = { ...body };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '***REDACTED***';
      }
    }

    return sanitized;
  }
}
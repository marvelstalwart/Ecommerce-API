"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    logger = new common_1.Logger(HttpExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const errorResponse = this.buildErrorResponse(exception, request);
        this.logError(exception, errorResponse, request);
        response.status(errorResponse.statusCode).json(errorResponse);
    }
    buildErrorResponse(exception, request) {
        const timestamp = new Date().toISOString();
        const path = request.url;
        const method = request.method;
        const correlationId = request.headers['x-correlation-id'];
        if (exception instanceof common_1.HttpException) {
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
        return {
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
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
    extractMessage(exceptionResponse) {
        if (typeof exceptionResponse === 'string') {
            return exceptionResponse;
        }
        if (typeof exceptionResponse === 'object' &&
            'message' in exceptionResponse) {
            return exceptionResponse.message;
        }
        return 'An error occurred';
    }
    logError(exception, errorResponse, request) {
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
            this.logger.error(`${method} ${url} - ${statusCode}`, exception instanceof Error ? exception.stack : JSON.stringify(exception), JSON.stringify(logContext));
        }
        else if (statusCode >= 400) {
            this.logger.warn(`${method} ${url} - ${statusCode}`, JSON.stringify(logContext));
        }
    }
    sanitizeBody(body) {
        if (!body)
            return body;
        const sensitiveFields = ['password', 'token', 'secret', 'apiKey', 'creditCard'];
        const sanitized = { ...body };
        for (const field of sensitiveFields) {
            if (field in sanitized) {
                sanitized[field] = '***REDACTED***';
            }
        }
        return sanitized;
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map
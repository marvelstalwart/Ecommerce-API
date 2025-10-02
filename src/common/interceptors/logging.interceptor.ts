import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
    Observable,
    tap
} from 'rxjs';

 @Injectable()
 export class LoggingInterceptor implements NestInterceptor{
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next:CallHandler):Observable<any>{
        const ctx=context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const {method, url, body,params, query} = request;
        const userAgent = request.get('user-agent') ||'';
        const ip = request.ip;


        const now = Date.now();
        // Log incoming request
        this.logger.log(
            `Incoming Request: ${method} ${url} - IP: ${ip} - UserAgent: ${userAgent}`
        )

        // Log request details in development
        if (process.env.NODE_ENV === 'development') {
             this.logger.debug(`Body: ${JSON.stringify(this.sanitizeBody(body))}`);
             this.logger.debug(`Params: ${JSON.stringify(params)}`);
            this.logger.debug(`Query: ${JSON.stringify(query)}`);
        }
        // Handle the request, and pipe the response in this format
        return next.handle().pipe(
            tap({
                next: (data)=> {
                    const responseTime = Date.now() - now;
                    const statusCode = response.statusCode;
                    this.logger.log(
                        `
                        Outgoing Response: ${method} ${url} - Status: ${statusCode} - ${responseTime}ms`
                    )
                       // Log response data in development
                        if (process.env.NODE_ENV === 'development') {
                            this.logger.debug(`Response: ${JSON.stringify(data)}`);
                        }

                },
                error: (error)=> {
                    const responseTime = Date.now() - now
                    this.logger.error(
                        `Request Failed: ${method} ${url} -${responseTime}ms`, error.stack
                    )
                }
            }) 
        )
    }

    private sanitizeBody(body: any): any {
        if (!body) return body;

        const sensitiveFields = ['password', 'token', 'secret', 'apiKey']
        const sanitized = {...body}

        for (const field of sensitiveFields) {
            if (field in sanitized) {
                sanitized[field] = '***REDACTED***';

            }
        }
        return sanitized
    }

 }
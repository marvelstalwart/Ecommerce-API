"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let LoggingInterceptor = class LoggingInterceptor {
    logger = new common_1.Logger('HTTP');
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const { method, url, body, params, query } = request;
        const userAgent = request.get('user-agent') || '';
        const ip = request.ip;
        const now = Date.now();
        this.logger.log(`Incoming Request: ${method} ${url} - IP: ${ip} - UserAgent: ${userAgent}`);
        if (process.env.NODE_ENV === 'development') {
            this.logger.debug(`Body: ${JSON.stringify(this.sanitizeBody(body))}`);
            this.logger.debug(`Params: ${JSON.stringify(params)}`);
            this.logger.debug(`Query: ${JSON.stringify(query)}`);
        }
        return next.handle().pipe((0, rxjs_1.tap)({
            next: (data) => {
                const responseTime = Date.now() - now;
                const statusCode = response.statusCode;
                this.logger.log(`
                        Outgoing Response: ${method} ${url} - Status: ${statusCode} - ${responseTime}ms`);
                if (process.env.NODE_ENV === 'development') {
                    this.logger.debug(`Response: ${JSON.stringify(data)}`);
                }
            },
            error: (error) => {
                const responseTime = Date.now() - now;
                this.logger.error(`Request Failed: ${method} ${url} -${responseTime}ms`, error.stack);
            }
        }));
    }
    sanitizeBody(body) {
        if (!body)
            return body;
        const sensitiveFields = ['password', 'token', 'secret', 'apiKey'];
        const sanitized = { ...body };
        for (const field of sensitiveFields) {
            if (field in sanitized) {
                sanitized[field] = '***REDACTED***';
            }
        }
        return sanitized;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map
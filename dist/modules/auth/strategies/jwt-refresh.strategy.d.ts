import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(req: Request, payload: JwtPayload): Promise<{
        refreshToken: string;
        sub: string;
        email: string;
        iat?: number;
        exp?: number;
    }>;
}
export {};

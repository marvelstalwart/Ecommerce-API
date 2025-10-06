import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UserService } from "../../../modules/users/user.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UserService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
}
export {};

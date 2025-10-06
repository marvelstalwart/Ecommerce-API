import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../../modules/users/user.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";


// decode the jwt from bearer, override the validate function from parent class 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        private usersService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') as string
        })

    }
    
    async validate(payload: JwtPayload) {
            const user = await this.usersService.findById(payload.sub)
            if (!user) {
                throw new UnauthorizedException('User not found')
            }
            
            return {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
    }
}
 


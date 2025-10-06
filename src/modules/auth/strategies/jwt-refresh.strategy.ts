import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Request } from "express"
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayload } from "../interfaces/jwt-payload.interface"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
        constructor(
                private configService: ConfigService,
            ) {
                super({
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    ignoreExpiration: false,
                    secretOrKey: configService.get<string>('JWT_SECRET') as string,
                    passReqToCallback: true,
                })
                
            }

             async validate(req: Request, payload: JwtPayload){
                const refreshToken  = req.get('Authorization')?.replace('Bearer','').trim()
                if (!refreshToken) {
                    throw new UnauthorizedException('Refresh token not found')
                }

                return {
                    ...payload,
                    refreshToken
                }
            }

}
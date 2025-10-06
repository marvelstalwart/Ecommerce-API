import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,  //Base Auth for Nest Js
        //  Configure Jwt using environment variables
        JwtModule.registerAsync({
            imports: [ConfigModule], //Access to env variables
            inject: [ConfigService], // Make config avaliable
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRATION', '15m')
                }
            })
        })

    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        JwtRefreshStrategy,
        LocalStrategy
    ],
    exports: [AuthService]
})

export class AuthModule {}
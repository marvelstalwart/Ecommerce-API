import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { comparePasswords } from "../../common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserService } from "../users/user.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
        private configService : ConfigService,
        private readonly userService: UserService
    ) {}


    async createUser (data: CreateUserDto): Promise<AuthResponseDto> {
            const user = await this.userService.createUser(data)
            const tokens = await this.generateTokens(user.id, user.email)
            return {
                ...tokens,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            }
        }
    

        
    async validateUser(email: string, pass: string) {
        const user = await this.userService.findByEmailWithPassword(email);
        if (!user) throw new UnauthorizedException("Invalid credentials");
        

        const isMatch = await comparePasswords(pass, user.password)
        if (!isMatch) throw new UnauthorizedException("Invalid credentials")

        return user
    }

    async login (dto: LoginDto) {
        const user = await this.validateUser(dto.email, dto.password)
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate tokens (refresh and jwt)
        const tokens  = await this.generateTokens(user.id, user.email);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }
    }
    async refreshTokens(userId: string, refreshToken: string) : Promise<AuthResponseDto> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found')
        }
        const tokens = await this.generateTokens(user.id, user.email)
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }
    }

    private async generateTokens (userId: string, email: string) {
        const payload : JwtPayload = {
            sub: userId,
            email 
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: this.configService.get<string>('JWT_EXPIRATION','15m')
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d')
            })
        ])

        return {
            accessToken,
            refreshToken
        }
    }

    async logout (userId: string) : Promise<void> {
        // .....
    }

}
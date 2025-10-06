import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserService } from "../users/user.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
export declare class AuthService {
    private readonly jwtService;
    private configService;
    private readonly userService;
    constructor(jwtService: JwtService, configService: ConfigService, userService: UserService);
    createUser(data: CreateUserDto): Promise<AuthResponseDto>;
    validateUser(email: string, pass: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<AuthResponseDto>;
    private generateTokens;
    logout(userId: string): Promise<void>;
}

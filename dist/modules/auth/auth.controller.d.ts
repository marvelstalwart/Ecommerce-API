import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import type { JwtPayloadWithRefreshToken } from './interfaces/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: CreateUserDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    refresh(user: JwtPayloadWithRefreshToken): Promise<AuthResponseDto>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    getProfile(user: any): Promise<any>;
}

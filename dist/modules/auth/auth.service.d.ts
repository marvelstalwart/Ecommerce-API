import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { LoginDto } from "./dto/login.dto";
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    validateUser(email: string, pass: string): Promise<{
        email: string;
        password: string;
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<void>;
}

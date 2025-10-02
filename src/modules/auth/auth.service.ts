import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { comparePasswords } from "../../common";
import { UserService } from "../users/user.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException("Invalid credentials");
        const isMatch = await comparePasswords(pass, user.password)
        if (!isMatch) throw new UnauthorizedException("Invalid credentials")

        return user
    }

    async login (dto: LoginDto) {
        const user = await this.validateUser(dto.email, dto.password)
        const payload: JwtPayload
    }

}
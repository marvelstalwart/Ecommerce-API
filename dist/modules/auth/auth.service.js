"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("../../common");
const user_service_1 = require("../users/user.service");
let AuthService = class AuthService {
    jwtService;
    configService;
    userService;
    constructor(jwtService, configService, userService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
    }
    async createUser(data) {
        const user = await this.userService.createUser(data);
        const tokens = await this.generateTokens(user.id, user.email);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }
    async validateUser(email, pass) {
        const user = await this.userService.findByEmailWithPassword(email);
        if (!user)
            throw new common_1.UnauthorizedException("Invalid credentials");
        const isMatch = await (0, common_2.comparePasswords)(pass, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException("Invalid credentials");
        return user;
    }
    async login(dto) {
        const user = await this.validateUser(dto.email, dto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user.id, user.email);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const tokens = await this.generateTokens(user.id, user.email);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }
    async generateTokens(userId, email) {
        const payload = {
            sub: userId,
            email
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRATION', '15m')
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d')
            })
        ]);
        return {
            accessToken,
            refreshToken
        };
    }
    async logout(userId) {
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
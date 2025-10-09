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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ProductRepository = class ProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { userId, ...rest } = data;
        try {
            return await this.prisma.product.create({
                data: {
                    ...rest,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByCategory(category) {
        return await this.prisma.product.findMany({
            where: {
                category,
            },
        });
    }
    async find() {
        return await this.prisma.product.findMany();
    }
    async findById(id) {
        return await this.prisma.product.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return await this.prisma.product.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await this.prisma.product.delete({
            where: { id },
        });
    }
    async findByUserId(userId) {
        return await this.prisma.product.findMany({
            where: { userId },
        });
    }
    async search(query) {
        return await this.prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map
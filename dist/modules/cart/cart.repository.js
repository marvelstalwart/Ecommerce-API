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
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let CartRepository = class CartRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCartDto) {
        try {
            return await this.prisma.shoppingCart.create({
                data: {
                    userId: createCartDto.userId,
                    items: {
                        create: createCartDto.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                    user: true,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByUserId(userId) {
        return this.prisma.shoppingCart.findUnique({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: true,
            },
        });
    }
    async findById(cartId) {
        return this.prisma.shoppingCart.findUnique({
            where: { id: cartId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: true,
            },
        });
    }
    async update(cartId, updateCartDto) {
        return this.prisma.$transaction(async (prisma) => {
            const existingItems = await prisma.cartItem.findMany({
                where: { cartId },
            });
            const newItems = updateCartDto.items || [];
            const existingIds = new Set(existingItems.map((item) => item.productId));
            const newIds = new Set(newItems.map((item) => item.productId));
            await prisma.cartItem.deleteMany({
                where: { cartId, productId: { notIn: Array.from(newIds) } },
            });
            for (const item of newItems) {
                if (existingIds.has(item.productId)) {
                    await prisma.cartItem.updateMany({
                        where: { cartId, productId: item.productId },
                        data: { quantity: item.quantity },
                    });
                }
                else {
                    await prisma.cartItem.create({
                        data: {
                            cartId,
                            productId: item.productId,
                            quantity: item.quantity,
                        },
                    });
                }
            }
            return prisma.shoppingCart.findUnique({
                where: { id: cartId },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                    user: true,
                },
            });
        });
    }
    async clearCart(cartId) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                await prisma.cartItem.deleteMany({
                    where: { cartId },
                });
                return prisma.shoppingCart.findUnique({
                    where: { id: cartId },
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                        user: true,
                    },
                });
            });
        }
        catch (error) {
            throw error;
        }
    }
    async delete(cartId) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                await prisma.cartItem.deleteMany({
                    where: { cartId },
                });
                return prisma.shoppingCart.delete({
                    where: { id: cartId },
                });
            });
        }
        catch (error) {
            throw error;
        }
    }
    async hasProduct(cartId, productId) {
        const item = await this.prisma.cartItem.findFirst({
            where: {
                cartId,
                productId,
            },
        });
        return !!item;
    }
    async getItemCount(cartId) {
        return this.prisma.cartItem.count({
            where: { cartId },
        });
    }
    async getTotalQuantity(cartId) {
        const items = await this.prisma.cartItem.findMany({
            where: { cartId },
            select: { quantity: true },
        });
        return items.reduce((total, item) => total + item.quantity, 0);
    }
    async getTotalPrice(cartId) {
        const cart = await this.prisma.shoppingCart.findUnique({
            where: { id: cartId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!cart) {
            return 0;
        }
        return cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    }
    async findOrCreate(userId) {
        let cart = await this.findByUserId(userId);
        if (!cart) {
            cart = await this.create({
                userId,
                items: [],
            });
        }
        return cart;
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartRepository);
//# sourceMappingURL=cart.repository.js.map
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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_repository_1 = require("./cart.repository");
let CartService = class CartService {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async createCart(createCartDto) {
        return this.cartRepository.create(createCartDto);
    }
    async getCartByUserId(userId) {
        return this.cartRepository.findByUserId(userId);
    }
    async getCartById(cartId) {
        return this.cartRepository.findById(cartId);
    }
    async getItemCount(cartId) {
        return this.cartRepository.getItemCount(cartId);
    }
    async getTotalPrice(cartId) {
        return this.cartRepository.getTotalPrice(cartId);
    }
    async clearCart(userId) {
        return this.cartRepository.clearCart(userId);
    }
    async updateCart(cartId, updateCartDto) {
        return this.cartRepository.update(cartId, updateCartDto);
    }
    async deleteCart(cartId) {
        return this.cartRepository.delete(cartId);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository])
], CartService);
//# sourceMappingURL=cart.service.js.map
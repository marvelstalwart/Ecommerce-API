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
exports.CartOwnerGuard = void 0;
const common_1 = require("@nestjs/common");
const cart_repository_1 = require("../../cart/cart.repository");
let CartOwnerGuard = class CartOwnerGuard {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const cartId = request.params.cartId;
        if (!user)
            throw new common_1.ForbiddenException('User not authenticated');
        if (!cartId)
            return true;
        const cart = await this.cartRepository.findById(cartId);
        if (!cart || cart.userId !== user.id) {
            throw new common_1.ForbiddenException('You do not own this cart');
        }
        return true;
    }
};
exports.CartOwnerGuard = CartOwnerGuard;
exports.CartOwnerGuard = CartOwnerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository])
], CartOwnerGuard);
//# sourceMappingURL=cart-owner.guard.js.map
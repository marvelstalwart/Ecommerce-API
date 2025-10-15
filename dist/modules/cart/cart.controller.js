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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const check_cart_ownership_decorator_1 = require("../../common/decorators/check-cart-ownership.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const cart_service_1 = require("./cart.service");
const create_cart_item_dto_1 = require("./dto/create-cart-item.dto");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const update_cart_dto_1 = require("./dto/update-cart-dto");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getAuthenticatedUserCart(user) {
        return this.cartService.getCartByUserId(user.id);
    }
    createCart(user, createCartDto) {
        if (!user.id)
            throw new common_1.ForbiddenException('User not authenticated');
        const finalDto = { ...createCartDto, userId: user.id };
        return this.cartService.createCart(finalDto);
    }
    updateCart(cartId, updateCartDto) {
        return this.cartService.updateCart(cartId, updateCartDto);
    }
    updateItemQuantity(cartId, updateItem) {
        return this.cartService.updateItemQuantity(cartId, updateItem.productId, updateItem.quantity);
    }
    removeItemFromCart(cartId, itemId) {
        return this.cartService.removeItemFromCart(cartId, itemId);
    }
    getCartById(cartId) {
        return this.cartService.getCartById(cartId);
    }
    deleteCart(user) {
        return this.cartService.deleteCart(user.id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, check_cart_ownership_decorator_1.CheckCartOwnership)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get cart from authenticated user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The shopping cart has been successfully retrieved.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Not Found - cart does not exist!',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getAuthenticatedUserCart", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new shopping cart' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The shopping cart has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad Request - validation failed!',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_cart_dto_1.CreateCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "createCart", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, check_cart_ownership_decorator_1.CheckCartOwnership)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing shopping cart' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The shopping cart has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad Request - validation failed!',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cart_dto_1.UpdateCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
__decorate([
    (0, common_1.Patch)(':cartId/items'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, check_cart_ownership_decorator_1.CheckCartOwnership)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Item quantity' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The item has been successfully updated in the cart.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad Request - validation failed!',
    }),
    (0, swagger_1.ApiBody)({ type: create_cart_item_dto_1.CreateCartItemDto }),
    __param(0, (0, common_1.Param)('cartId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_cart_item_dto_1.CreateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateItemQuantity", null);
__decorate([
    (0, common_1.Delete)(':cartId/items/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, check_cart_ownership_decorator_1.CheckCartOwnership)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from cart' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The item has been successfully removed from the cart.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad Request - validation failed!',
    }),
    __param(0, (0, common_1.Param)('cartId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItemFromCart", null);
__decorate([
    (0, common_1.Get)(':cartId'),
    (0, check_cart_ownership_decorator_1.CheckCartOwnership)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get cart by ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The shopping cart has been successfully retrieved.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Not Found - cart does not exist!',
    }),
    __param(0, (0, common_1.Param)('cartId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartById", null);
__decorate([
    (0, common_1.Delete)(),
    (0, check_cart_ownership_decorator_1.CheckCartOwnership)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete authenticated user's cart" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The shopping cart has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Not Found - cart does not exist!',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map
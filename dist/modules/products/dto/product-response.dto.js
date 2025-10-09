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
exports.ProductResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const prisma_1 = require("../../../../generated/prisma/index.js");
class ProductResponseDto {
    id;
    name;
    description;
    price;
    stock;
    category;
    imageUrl;
    userId;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, {
            ...partial,
            imageUrl: partial.imageUrl ?? undefined
        });
    }
}
exports.ProductResponseDto = ProductResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'f54c2b4b-ef3b-4c7b-913a-bb0a2e876def',
        description: 'Unique identifier of the product',
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Wireless Bluetooth Headphones',
        description: 'The name of the product',
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'High-quality wireless headphones with noise cancellation',
        description: 'Detailed description of the product',
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 129.99,
        description: 'The price of the product in USD',
    }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Number of units available in stock',
    }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: prisma_1.CategoryType.ELECTRONICS,
        description: 'Category the product belngs to',
        enum: prisma_1.CategoryType,
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/image.jpg',
        description: 'Image URL of the product (if any)',
        required: false,
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'c23b2d9d-bf1e-47f8-b3a7-3c7b5d43f521',
        description: 'ID of the artisan or seller who owns this product',
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-10-07T14:32:00.000Z',
        description: 'Timestamp when the product was created',
    }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-10-07T14:32:00.000Z',
        description: 'Timestamp when the product was last updated',
    }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=product-response.dto.js.map
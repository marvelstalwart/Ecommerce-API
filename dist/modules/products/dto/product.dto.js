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
exports.CreateProductDto = exports.ProductCategory = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["ELECTRONICS"] = "ELECTRONICS";
    ProductCategory["FASHION"] = "FASHION";
    ProductCategory["HOME"] = "HOME";
    ProductCategory["BEAUTY"] = "BEAUTY";
    ProductCategory["SPORTS"] = "SPORTS";
    ProductCategory["OTHER"] = "OTHER";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
class CreateProductDto {
    name;
    description;
    price;
    stock;
    category;
    imageUrl;
    userId;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Wireless Bluetooth Headphones',
        description: 'The name of the product',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'High-quality wireless headphones with noise cancellation',
        description: 'Detailed description of the product',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 129.99,
        description: 'The price of the product in USD',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Number of units available in stock',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ProductCategory.ELECTRONICS,
        description: 'Category the product belongs to',
        enum: ProductCategory,
        default: ProductCategory.OTHER,
    }),
    (0, class_validator_1.IsEnum)(ProductCategory),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/image.jpg',
        description: 'Optional image URL for the product',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'f54c2b4b-ef3b-4c7b-913a-bb0a2e876def',
        description: 'ID of the artisan or seller who owns this product',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "userId", void 0);
//# sourceMappingURL=product.dto.js.map
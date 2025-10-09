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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./product.repository");
let ProductService = class ProductService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async createProduct(data) {
        return await this.productRepository.create(data);
    }
    async getAllProducts() {
        return this.productRepository.find();
    }
    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async getProductsByCategory(category) {
        return this.productRepository.findByCategory(category);
    }
    async updateProduct(id, data) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return this.productRepository.update(id, data);
    }
    async searchProduct(query) {
        return await this.productRepository.search(query);
    }
    async deleteProduct(id, userId) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        if (product.userId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to delete this product');
        }
        await this.productRepository.delete(id);
    }
    async getProductsByUserId(userId) {
        return this.productRepository.findByUserId(userId);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductService);
//# sourceMappingURL=product.service.js.map
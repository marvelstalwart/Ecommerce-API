import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'generated/prisma';
import { CreateProductDto, ProductCategory } from './dto/product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: CreateProductDto): Promise<Product> {
    return await this.productRepository.create(data);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.productRepository.findByCategory(category);
  }

  async updateProduct(
    id: string,
    data: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.productRepository.update(id, data);
  }

  async searchProduct(query: string): Promise<Product[] | []> {
    return await this.productRepository.search(query);
  }

  async deleteProduct(id: string, userId): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if (product.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this product',
      );
    }
    await this.productRepository.delete(id);
  }

  async getProductsByUserId(userId: string): Promise<Product[]> {
    return this.productRepository.findByUserId(userId);
  }
}

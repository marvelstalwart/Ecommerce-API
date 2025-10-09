import { Injectable } from '@nestjs/common';
import { Product } from 'generated/prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto, ProductCategory } from './dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateProductDto): Promise<Product> {
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
    } catch (error) {
      throw error;
    }
  }

  async findByCategory(category: ProductCategory): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: {
        category,
      },
    });
  }

  async find(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<CreateProductDto>): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return await this.prisma.product.delete({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: { userId },
    });
  }

  async search(query: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
}

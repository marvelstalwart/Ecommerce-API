import { Product } from 'generated/prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto, ProductCategory } from './dto/product.dto';
export declare class ProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductDto): Promise<Product>;
    findByCategory(category: ProductCategory): Promise<Product[]>;
    find(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    update(id: string, data: Partial<CreateProductDto>): Promise<Product>;
    delete(id: string): Promise<Product>;
    findByUserId(userId: string): Promise<Product[]>;
    search(query: string): Promise<Product[]>;
}

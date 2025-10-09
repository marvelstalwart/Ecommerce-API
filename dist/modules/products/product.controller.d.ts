import { Product } from 'generated/prisma';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto, ProductCategory } from './dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(userId: string, createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    getAll(): Promise<Product[]>;
    getByCategory(category: ProductCategory): Promise<Product[]>;
    search(query: string): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    update(id: string, data: Partial<CreateProductDto>): Promise<Product>;
    delete(userId: string, id: string): Promise<void>;
}

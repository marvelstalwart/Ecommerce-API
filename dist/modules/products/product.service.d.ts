import { Product } from 'generated/prisma';
import { CreateProductDto, ProductCategory } from './dto/product.dto';
import { ProductRepository } from './product.repository';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: ProductRepository);
    createProduct(data: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    getProductsByCategory(category: ProductCategory): Promise<Product[]>;
    updateProduct(id: string, data: Partial<CreateProductDto>): Promise<Product>;
    searchProduct(query: string): Promise<Product[] | []>;
    deleteProduct(id: string, userId: any): Promise<void>;
    getProductsByUserId(userId: string): Promise<Product[]>;
}

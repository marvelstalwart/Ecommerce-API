import { CategoryType as ProductCategory } from 'generated/prisma';
export declare class ProductResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: ProductCategory;
    imageUrl?: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: any);
}

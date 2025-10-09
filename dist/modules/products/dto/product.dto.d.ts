export declare enum ProductCategory {
    ELECTRONICS = "ELECTRONICS",
    FASHION = "FASHION",
    HOME = "HOME",
    BEAUTY = "BEAUTY",
    SPORTS = "SPORTS",
    OTHER = "OTHER"
}
export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: ProductCategory;
    imageUrl?: string;
    userId?: string;
}

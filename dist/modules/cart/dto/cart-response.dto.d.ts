export declare class CartItemReponseDto {
    id: string;
    productId: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        category: string;
        imageUrl: string;
    };
}
export declare class CartResponseDto {
    id: string;
    userId?: string;
    items: CartItemReponseDto[];
    itemCount: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: any);
}

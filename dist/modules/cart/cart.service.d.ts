import { CartRepository, CartWithItems } from './cart.repository';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartService {
    private readonly cartRepository;
    constructor(cartRepository: CartRepository);
    createCart(createCartDto: CreateCartDto): Promise<{
        user: {
            password: string;
            firstName: string;
            lastName: string;
            email: string;
            id: string;
            shoppingCartId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            product: {
                description: string;
                id: string;
                name: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
                userId: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
    } & {
        id: string;
        userId: string;
    }>;
    getCartByUserId(userId: string): Promise<({
        user: {
            password: string;
            firstName: string;
            lastName: string;
            email: string;
            id: string;
            shoppingCartId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            product: {
                description: string;
                id: string;
                name: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
                userId: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
    } & {
        id: string;
        userId: string;
    }) | null>;
    getCartById(cartId: string): Promise<({
        user: {
            password: string;
            firstName: string;
            lastName: string;
            email: string;
            id: string;
            shoppingCartId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            product: {
                description: string;
                id: string;
                name: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
                userId: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
    } & {
        id: string;
        userId: string;
    }) | null>;
    getItemCount(cartId: string): Promise<number>;
    getTotalPrice(cartId: string): Promise<number>;
    clearCart(userId: string): Promise<{
        user: {
            password: string;
            firstName: string;
            lastName: string;
            email: string;
            id: string;
            shoppingCartId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            product: {
                description: string;
                id: string;
                name: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
                userId: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
    } & {
        id: string;
        userId: string;
    }>;
    updateCart(cartId: string, updateCartDto: Partial<CartWithItems>): Promise<{
        user: {
            password: string;
            firstName: string;
            lastName: string;
            email: string;
            id: string;
            shoppingCartId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            product: {
                description: string;
                id: string;
                name: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
                userId: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
    } & {
        id: string;
        userId: string;
    }>;
    deleteCart(cartId: string): Promise<{
        id: string;
        userId: string;
    }>;
}

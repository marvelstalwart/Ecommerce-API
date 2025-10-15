import { CartRepository } from './cart.repository';
import { CartResponseDto } from './dto/cart-response.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart-dto';
export declare class CartService {
    private readonly cartRepository;
    constructor(cartRepository: CartRepository);
    createCart(createCartDto: CreateCartDto): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                userId: string;
                description: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        userId: string;
    }>;
    getCartByUserId(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                userId: string;
                description: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        userId: string;
    }) | null>;
    getCartById(cartId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                userId: string;
                description: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        userId: string;
    }) | null>;
    getItemCount(cartId: string): Promise<number>;
    getTotalPrice(cartId: string): Promise<number>;
    updateItemQuantity(cartId: string, productId: string, quantity: number): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                userId: string;
                description: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        userId: string;
    }>;
    removeItemFromCart(cartId: string, productId: string): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                userId: string;
                description: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        userId: string;
    }>;
    clearCart(userId: string): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                userId: string;
                description: string;
                price: number;
                stock: number;
                category: import("generated/prisma").$Enums.CategoryType;
                imageUrl: string | null;
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        userId: string;
    }>;
    updateCart(cartId: string, updateCartDto: UpdateCartDto): Promise<CartResponseDto>;
    deleteCart(cartId: string): Promise<{
        id: string;
        userId: string;
    }>;
    private buildCartResponse;
}

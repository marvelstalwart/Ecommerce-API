import { Prisma, ShoppingCart } from 'generated/prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
export type CartWithItems = Prisma.ShoppingCartGetPayload<{
    include: {
        items: {
            include: {
                product: true;
            };
        };
        user: true;
    };
}>;
export declare class CartRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCartDto: CreateCartDto): Promise<CartWithItems>;
    findByUserId(userId: string): Promise<CartWithItems | null>;
    findById(cartId: string): Promise<CartWithItems | null>;
    update(cartId: string, updateCartDto: Partial<CartWithItems>): Promise<CartWithItems>;
    clearCart(cartId: string): Promise<CartWithItems>;
    delete(cartId: string): Promise<ShoppingCart>;
    hasProduct(cartId: string, productId: string): Promise<boolean>;
    getItemCount(cartId: string): Promise<number>;
    getTotalQuantity(cartId: string): Promise<number>;
    getTotalPrice(cartId: string): Promise<number>;
    findOrCreate(userId: string): Promise<CartWithItems>;
}

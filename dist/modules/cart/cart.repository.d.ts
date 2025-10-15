import { Prisma, ShoppingCart } from 'generated/prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart-dto';
type BaseCartInclude = {
    items: {
        include: {
            product: true;
        };
    };
};
export type CartWithItems = Prisma.ShoppingCartGetPayload<{
    include: BaseCartInclude & {
        user: {
            select: {
                id: true;
                email: true;
                firstName: true;
                lastName: true;
            };
        };
    };
}>;
export type Cart = Prisma.ShoppingCartGetPayload<{
    include: BaseCartInclude;
}>;
export declare class CartRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCartDto: CreateCartDto): Promise<CartWithItems>;
    findByUserId(userId: string): Promise<Cart | null>;
    findById(cartId: string): Promise<CartWithItems | null>;
    update(cartId: string, updateCartDto: UpdateCartDto): Promise<CartWithItems>;
    updateItemQuantity(cartId: string, productId: string, quantity: number): Promise<CartWithItems>;
    removeItem(cartId: string, productId: string): Promise<CartWithItems>;
    clearCart(cartId: string): Promise<CartWithItems>;
    delete(cartId: string): Promise<ShoppingCart>;
    hasProduct(cartId: string, productId: string): Promise<boolean>;
    getItemCount(cartId: string): Promise<number>;
    getTotalQuantity(cartId: string): Promise<number>;
    getTotalPrice(cartId: string): Promise<number>;
}
export {};

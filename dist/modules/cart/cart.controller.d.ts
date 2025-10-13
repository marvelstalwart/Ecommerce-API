import { ShoppingCart } from 'generated/prisma';
import { CartWithItems } from './cart.repository';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    createCart(createCartDto: CreateCartDto): Promise<ShoppingCart>;
    updateCart(cartId: string, updateCartDto: Partial<CartWithItems>): Promise<CartWithItems>;
    getCartById(cartId: string): Promise<CartWithItems | null>;
    getCartByUserId(userId: string): Promise<CartWithItems | null>;
    deleteCart(userId: string): Promise<ShoppingCart>;
}

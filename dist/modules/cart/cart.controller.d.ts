import { ShoppingCart, User } from 'generated/prisma';
import { Cart, CartWithItems } from './cart.repository';
import { CartService } from './cart.service';
import { CartResponseDto } from './dto/cart-response.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart-dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getAuthenticatedUserCart(user: Partial<User>): Promise<Cart | null>;
    createCart(user: Partial<User>, createCartDto: CreateCartDto): Promise<Cart>;
    updateCart(cartId: string, updateCartDto: UpdateCartDto): Promise<CartResponseDto>;
    updateItemQuantity(cartId: string, updateItem: CreateCartItemDto): Promise<Cart>;
    removeItemFromCart(cartId: string, itemId: string): Promise<Cart>;
    getCartById(cartId: string): Promise<CartWithItems | null>;
    deleteCart(user: Partial<User>): Promise<ShoppingCart>;
}

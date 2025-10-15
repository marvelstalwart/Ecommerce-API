import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartResponseDto } from './dto/cart-response.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart-dto';
@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  async createCart(createCartDto: CreateCartDto) {
    const existingCart = await this.cartRepository.findByUserId(
      createCartDto.userId as string,
    );
    if (existingCart) {
      // If a cart already exists for the user, return it instead of creating a new one
      return existingCart;
    }
    return this.cartRepository.create(createCartDto);
  }

  async getCartByUserId(userId: string) {
    return this.cartRepository.findByUserId(userId);
  }
  async getCartById(cartId: string) {
    return this.cartRepository.findById(cartId);
  }
  async getItemCount(cartId: string): Promise<number> {
    return this.cartRepository.getItemCount(cartId);
  }
  async getTotalPrice(cartId: string): Promise<number> {
    return this.cartRepository.getTotalPrice(cartId);
  }
  async updateItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ) {
    return this.cartRepository.updateItemQuantity(cartId, productId, quantity);
  }
  async removeItemFromCart(cartId: string, productId: string) {
    return this.cartRepository.removeItem(cartId, productId);
  }
  async clearCart(userId: string) {
    return this.cartRepository.clearCart(userId);
  }

  async updateCart(cartId: string, updateCartDto: UpdateCartDto) {
    const updatedCart = await this.cartRepository.update(cartId, updateCartDto);
    return this.buildCartResponse(updatedCart);
  }
  async deleteCart(cartId: string) {
    return this.cartRepository.delete(cartId);
  }

  private async buildCartResponse(cart: any): Promise<CartResponseDto> {
    const [itemCount, totalPrice, totalQuantity] = await Promise.all([
      this.cartRepository.getItemCount(cart.id),
      this.cartRepository.getTotalPrice(cart.id),
      this.cartRepository.getTotalQuantity(cart.id),
    ]);
    return new CartResponseDto({
      ...cart,
      itemCount,
      totalPrice,
      totalQuantity,
    });
  }
}

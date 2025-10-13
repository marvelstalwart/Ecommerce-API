import { Injectable } from '@nestjs/common';
import { CartRepository, CartWithItems } from './cart.repository';
import { CreateCartDto } from './dto/create-cart.dto';
@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  async createCart(createCartDto: CreateCartDto) {
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
  async clearCart(userId: string) {
    return this.cartRepository.clearCart(userId);
  }

  async updateCart(cartId: string, updateCartDto: Partial<CartWithItems>) {
    return this.cartRepository.update(cartId, updateCartDto);
  }
  async deleteCart(cartId: string) {
    return this.cartRepository.delete(cartId);
  }
}

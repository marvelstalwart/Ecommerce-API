import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { CartRepository } from 'src/modules/cart/cart.repository';

@Injectable()
export class CartOwnerGuard implements CanActivate {
  constructor(private readonly cartRepository: CartRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const cartId = request.params.cartId;
    if (!user) throw new ForbiddenException('User not authenticated');
    if (!cartId) return true;
    const cart = await this.cartRepository.findById(cartId);
    if (!cart || cart.userId !== user.id) {
      throw new ForbiddenException('You do not own this cart');
    }
    return true;
  }
}

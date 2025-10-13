import { applyDecorators, UseGuards } from '@nestjs/common';
import { CartOwnerGuard } from '../../modules/auth/guards/cart-owner.guard';
export function CheckCartOwnership(): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(CartOwnerGuard));
}

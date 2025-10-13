import { applyDecorators, UseGuards } from '@nestjs/common';
import { CartOwnerGuard } from 'src/modules/auth/guards/cart-owner.guard';

export function IsCartOwner() {
  return applyDecorators(UseGuards(CartOwnerGuard));
}

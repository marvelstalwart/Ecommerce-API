import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CartRepository } from 'src/modules/cart/cart.repository';
export declare class CartOwnerGuard implements CanActivate {
    private readonly cartRepository;
    constructor(cartRepository: CartRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

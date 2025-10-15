import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ShoppingCart, User } from 'generated/prisma';
import { CheckCartOwnership } from 'src/common/decorators/check-cart-ownership.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Cart, CartWithItems } from './cart.repository';
import { CartService } from './cart.service';
import { CartResponseDto } from './dto/cart-response.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart-dto';
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  //Get cart from authenticated user
  @Get()
  @CheckCartOwnership()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get cart from authenticated user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The shopping cart has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found - cart does not exist!',
  })
  getAuthenticatedUserCart(
    @CurrentUser() user: Partial<User>,
  ): Promise<Cart | null> {
    return this.cartService.getCartByUserId(user.id!);
  }
  // Create cart
  //   TODO: Single API to create or update cart
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new shopping cart' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The shopping cart has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request - validation failed!',
  })
  createCart(
    @CurrentUser() user: Partial<User>,
    @Body() createCartDto: CreateCartDto,
  ): Promise<Cart> {
    if (!user.id) throw new ForbiddenException('User not authenticated');
    const finalDto = { ...createCartDto, userId: user.id };
    return this.cartService.createCart(finalDto);
  }
  // Update cart\
  // TODO fetch cart from User
  @Put(':id')
  @ApiBearerAuth()
  @CheckCartOwnership()
  @ApiOperation({ summary: 'Update an existing shopping cart' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The shopping cart has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request - validation failed!',
  })
  updateCart(
    @Param('id') cartId: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<CartResponseDto> {
    return this.cartService.updateCart(cartId, updateCartDto);
  }
  // Update Item quantity in cart
  @Patch(':cartId/items')
  @ApiBearerAuth()
  @CheckCartOwnership()
  @ApiOperation({ summary: 'Update Item quantity' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The item has been successfully updated in the cart.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request - validation failed!',
  })
  @ApiBody({ type: CreateCartItemDto })
  updateItemQuantity(
    @Param('cartId') cartId: string,
    @Body() updateItem: CreateCartItemDto,
  ): Promise<Cart> {
    return this.cartService.updateItemQuantity(
      cartId,
      updateItem.productId,
      updateItem.quantity,
    );
  }

  @Delete(':cartId/items/:id')
  @ApiBearerAuth()
  @CheckCartOwnership()
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The item has been successfully removed from the cart.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request - validation failed!',
  })
  removeItemFromCart(
    @Param('cartId') cartId: string,
    @Param('id') itemId: string,
  ): Promise<Cart> {
    return this.cartService.removeItemFromCart(cartId, itemId);
  }
  // get cart by id
  @Get(':cartId')
  @CheckCartOwnership()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get cart by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The shopping cart has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found - cart does not exist!',
  })
  getCartById(@Param('cartId') cartId: string): Promise<CartWithItems | null> {
    return this.cartService.getCartById(cartId);
  }

  //   Delete authenticated user's cart
  @Delete()
  @CheckCartOwnership()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete authenticated user's cart" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The shopping cart has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found - cart does not exist!',
  })
  deleteCart(@CurrentUser() user: Partial<User>): Promise<ShoppingCart> {
    return this.cartService.deleteCart(user.id!);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShoppingCart } from 'generated/prisma';
import { CheckCartOwnership } from 'src/common/decorators/check-cart-ownership.decorator';
import { CartWithItems } from './cart.repository';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  // Create cart
  @Post()
  @ApiOperation({ summary: 'Create a new shopping cart' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The shopping cart has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request - validation failed!',
  })
  createCart(@Body() createCartDto: CreateCartDto): Promise<ShoppingCart> {
    return this.cartService.createCart(createCartDto);
  }
  // Update cart
  @Put(':id')
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
    @Body() updateCartDto: Partial<CartWithItems>,
  ): Promise<CartWithItems> {
    return this.cartService.updateCart(cartId, updateCartDto);
  }
  // get cart by id
  @Get(':cartId')
  @CheckCartOwnership()
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
  //Get cart by user ID
  @Get(':userId')
  @CheckCartOwnership()
  @ApiOperation({ summary: 'Get cart by user ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The shopping cart has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found - cart does not exist!',
  })
  getCartByUserId(
    @Param('userId') userId: string,
  ): Promise<CartWithItems | null> {
    return this.cartService.getCartByUserId(userId);
  }
  //   Delete cart by user ID
  @Delete(':userId')
  @CheckCartOwnership()
  deleteCart(@Param('userId') userId: string): Promise<ShoppingCart> {
    return this.cartService.deleteCart(userId);
  }
}

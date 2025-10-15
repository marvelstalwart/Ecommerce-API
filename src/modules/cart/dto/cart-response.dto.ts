import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CartItemReponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  productId: string;

  @ApiProperty()
  @Expose()
  quantity: number;
  @ApiProperty()
  @Expose()
  @Type(() => Object)
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
  };
}

export class CartResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  userId?: string;

  @ApiProperty({ type: [CartItemReponseDto] })
  @Expose()
  @Type(() => CartItemReponseDto)
  items: CartItemReponseDto[];

  @ApiProperty()
  @Expose()
  itemCount: number;

  @ApiProperty()
  @Expose()
  totalPrice: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(partial: any) {
    Object.assign(this, partial);
  }
}

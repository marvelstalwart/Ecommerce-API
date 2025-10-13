import { IsInt, IsUUID, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({
    example: '',
    description: 'Unique ID of product added to cart',
  })
  @IsUUID()
  productId: string;
  @ApiProperty({
    example: 2,
    description: 'Quantity of product in the cart',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

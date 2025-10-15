import { IsInt, IsUUID, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
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

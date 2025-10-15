import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: 'c0a80123-7b5d-4f6b-bc2a-123456789abc',
    description: 'Unique identifier of cart owner',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of product to add to the cart',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

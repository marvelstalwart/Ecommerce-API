import { ApiProperty } from '@nestjs/swagger';

import { CategoryType as ProductCategory } from 'generated/prisma';
export class ProductResponseDto {
  @ApiProperty({
    example: 'f54c2b4b-ef3b-4c7b-913a-bb0a2e876def',
    description: 'Unique identifier of the product',
  })
  id: string;

  @ApiProperty({
    example: 'Wireless Bluetooth Headphones',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example: 'High-quality wireless headphones with noise cancellation',
    description: 'Detailed description of the product',
  })
  description: string;

  @ApiProperty({
    example: 129.99,
    description: 'The price of the product in USD',
  })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Number of units available in stock',
  })
  stock: number;

  @ApiProperty({
    example: ProductCategory.ELECTRONICS,
    description: 'Category the product belngs to',
    enum: ProductCategory,
  })
  category: ProductCategory;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL of the product (if any)',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    example: 'c23b2d9d-bf1e-47f8-b3a7-3c7b5d43f521',
    description: 'ID of the artisan or seller who owns this product',
  })
  userId: string;

  @ApiProperty({
    example: '2025-10-07T14:32:00.000Z',
    description: 'Timestamp when the product was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-10-07T14:32:00.000Z',
    description: 'Timestamp when the product was last updated',
  })
  updatedAt: Date;

    constructor(partial: any) {
    Object.assign(this, {
        ...partial,
        imageUrl: partial.imageUrl ?? undefined
    });
  }
}

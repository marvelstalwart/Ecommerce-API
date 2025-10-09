import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  FASHION = 'FASHION',
  HOME = 'HOME',
  BEAUTY = 'BEAUTY',
  SPORTS = 'SPORTS',
  OTHER = 'OTHER',
}

export class CreateProductDto {
  @ApiProperty({
    example: 'Wireless Bluetooth Headphones',
    description: 'The name of the product',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'High-quality wireless headphones with noise cancellation',
    description: 'Detailed description of the product',
  })
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    example: 129.99,
    description: 'The price of the product in USD',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Number of units available in stock',
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    example: ProductCategory.ELECTRONICS,
    description: 'Category the product belongs to',
    enum: ProductCategory,
    default: ProductCategory.OTHER,
  })
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Optional image URL for the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    example: 'f54c2b4b-ef3b-4c7b-913a-bb0a2e876def',
    description: 'ID of the artisan or seller who owns this product',
  })
  // TODO: Fix user Id
  @IsUUID()
  @IsOptional()
  userId?: string;
}

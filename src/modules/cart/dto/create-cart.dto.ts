import { IsArray, IsUUID, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from './create-cart-item.dto';

export class CreateCartDto {
  @ApiProperty({
    example: 'c0a80123-7b5d-4f6b-bc2a-123456789abc',
    description: 'Unique identifier of cart owner',
  })
  @IsUUID()
  userId: string;
  @ApiProperty({
    type: [CreateCartItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  items: CreateCartItemDto[];
}

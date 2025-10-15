import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateCartItemDto } from './create-cart-item.dto';
export class UpdateCartDto {
  @ApiProperty({
    type: [CreateCartItemDto],
    required: false,
    description: 'Update items in cart',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  items?: CreateCartItemDto[];
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from 'generated/prisma';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto, ProductCategory } from './dto/product.dto';
import { ProductService } from './product.service';
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // Create product
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request - validation failed!',
  })
  async create(
    @CurrentUser('id') userId: string,
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.createProduct({
      ...createProductDto,
      userId,
    });
    return new ProductResponseDto(product);
  }
  // Get all Products
  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all products',
    type: [ProductResponseDto],
  })
  async getAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  // Get products by category
  @Get('category/:category')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get products by category' })
  @ApiParam({
    name: 'category',
    enum: ProductCategory,
    description: 'Category to filter by',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products in the selected category',
    type: [ProductResponseDto],
  })
  async getByCategory(
    @Param('category') category: ProductCategory,
  ): Promise<Product[]> {
    return this.productService.getProductsByCategory(category);
  }
  // Query product
  @Get('search')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search products by name or description' })
  @ApiQuery({
    name: 'query',
    description: 'Search keyword',
    example: 'headphones',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search results',
    type: [ProductResponseDto],
  })
  async search(@Query('query') query: string): Promise<Product[]> {
    return this.productService.searchProduct(query);
  }
  // Get Product By Id
  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Unique product ID', example: 'uuid' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product retrieved successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
  })
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }
  // Update product
  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update product details' })
  @ApiParam({ name: 'id', description: 'Unique product ID', example: 'uuid' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product updated successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
  })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<CreateProductDto>,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }
  // Delete product, only product owner deletes
  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', description: 'Unique product ID', example: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
  })
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.productService.deleteProduct(id, userId);
  }
}

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Fetch all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Fetch a product by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOneById(id);
  }

  // Add a new product
  @Post()
  async create(@Body() productData: Product): Promise<Product> {
    return this.productService.create(productData);
  }
}

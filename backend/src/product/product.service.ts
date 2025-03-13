import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Fetch all products
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Fetch a product by ID
  async findOneById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  // Add a new product
  async create(productData: Product): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({
      id: productData.id,
    });
    if (existingProduct) {
      throw new Error(`Product with ID ${productData.id} already exists`);
    }
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }
}

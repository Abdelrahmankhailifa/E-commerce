import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  // cart.service.ts (changes in getCart method)
  async getCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      cart = this.cartRepo.create({
        items: [],
        user: { id: userId },
      });
      await this.cartRepo.save(cart);
    }

    return cart;
  }
  async addToCart(
    productId: number,
    quantity: number,
    userId: number,
  ): Promise<Cart> {
    // Get cart with userId
    const cart = await this.getCart(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const product = await this.productRepo.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!cart.items) {
      cart.items = [];
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.id === productId,
    );

    if (existingItem) {
      // If item exists, just update quantity
      existingItem.quantity += quantity;
      await this.cartItemRepo.save(existingItem);
    } else {
      // Create new item and ensure 'cart' is set
      const newItem = this.cartItemRepo.create({
        product,
        quantity,
        cart,
      });
      await this.cartItemRepo.save(newItem);
      cart.items.push(newItem);
    }

    // Recalculate total price
    cart.total = this.calculateTotal(cart.items);
    return this.cartRepo.save(cart);
  }

  async removeFromCart(productId: number, userId: number): Promise<Cart> {
    console.log(`🗑️ Removing Product ID: ${productId} for User ID: ${userId}`);

    // Fetch the user's cart
    const cart = await this.cartRepo.findOne({
      where: { user: { id: userId } }, // Ensure the cart belongs to the user
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      console.error('⚠️ Cart not found for user:', userId);
      throw new NotFoundException('Cart not found');
    }

    console.log('🛒 Cart Items before removal:', cart.items);

    // Find the cart item by productId
    const cartItem = cart.items.find((item) => item.product.id === productId);

    if (!cartItem) {
      console.error(`⚠️ Product ${productId} not found in cart!`);
      throw new NotFoundException(`Product ${productId} not found in cart`);
    }

    console.log('✅ Found product in cart, removing...');

    // Remove the cart item from the database
    await this.cartItemRepo.delete(cartItem.id);

    // Update the cart's items array and recalculate total
    cart.items = cart.items.filter((item) => item.id !== cartItem.id);
    cart.total = this.calculateTotal(cart.items);

    console.log('✅ Cart updated after removal:', cart);

    // Save and return the updated cart
    return this.cartRepo.save(cart);
  }

  async getUserCart(userId: number) {
    return this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.getUserCart(userId);
    await this.cartItemRepo.remove(cart.items);
    cart.items = [];
    cart.total = 0;
    await this.cartRepo.save(cart);
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => {
      const price = Number(item.product.price); // ✅ Use only price, ignore discount
      return sum + price * item.quantity;
    }, 0);
  }
}

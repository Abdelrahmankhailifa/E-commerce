// src/order/order.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service'; // Import UserService

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User) // Add this decorator
    private userRepository: Repository<User>, // Add this dependency
    private cartService: CartService,
    private readonly userService: UserService, // Inject UserService
  ) {}

  async createOrder(userId: number, orderData: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const cart = await this.cartService.getUserCart(userId);

    // Additional check: Ensure the cart is not empty
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = this.orderRepository.create({
      ...orderData,
      user,
      userId: userId,
      items: await Promise.all(
        cart.items.map(async (cartItem) => {
          return this.orderItemRepository.create({
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
            productName: cartItem.product.name,
            userId: userId, // Set userId in each OrderItem
          });
        }),
      ),
    });

    // Additional step: Save the order to the database
    const savedOrder = await this.orderRepository.save(order);

    // Optionally, you can also clear the cart here if needed:
    await this.cartService.clearCart(userId);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }
}

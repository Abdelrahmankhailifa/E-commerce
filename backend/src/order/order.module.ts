// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CartModule } from '../cart/cart.module'; // Add this import
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    UserModule,
    CartModule,
    JwtModule.register({
      secret: 'your-secret-key', // Replace with ConfigService in production
      signOptions: { expiresIn: '24h' },
    }), // Add CartModule to imports
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtAuthGuard],
  exports: [OrderService],
})
export class OrderModule {}

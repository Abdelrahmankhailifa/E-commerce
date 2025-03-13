import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../product/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product]),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with ConfigService in production
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CartController],
  providers: [CartService, JwtAuthGuard],
  exports: [CartService], // Add this export
})
export class CartModule {}

// src/cart/cart.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '../entities/cart.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard) // 🔥 Protect the entire controller
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req): Promise<Cart> {
    console.log('Request Object:', req); // 🔍 Check full request object
    console.log('Request User:', req.user); // 🔍 Check user object
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.cartService.getCart(req.user.userId);
  }
  @Post('add')
  async addToCart(
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
    @Req() req,
  ): Promise<Cart> {
    return this.cartService.addToCart(productId, quantity, req.user.userId);
  }

  @Delete('remove/:productId')
  async removeFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req,
  ) {
    console.log('🗑️ Removing Product ID:', productId);
    console.log('🛑 User Info:', req.user);

    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.cartService.removeFromCart(productId, req.user.userId); // ✅ Pass userId
  }

  @Delete('clear')
  async clearCart(@Req() req): Promise<void> {
    return this.cartService.clearCart(req.user.userId);
  }
}

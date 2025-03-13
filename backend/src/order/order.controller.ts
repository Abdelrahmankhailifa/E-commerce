// src/order/order.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Req() req, @Body() orderData: CreateOrderDto) {
    console.log('📥 Request User:', req.user);

    if (!req.user || !req.user.userId) {
      throw new UnauthorizedException('User ID not found in token');
    }

    return this.orderService.createOrder(req.user.userId, orderData);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}

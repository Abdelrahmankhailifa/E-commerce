// user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users (Admin only)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Get current user profile
  @Get('me')
  async getProfile(@Req() req): Promise<User> {
    return this.userService.findById(req.user.userId);
  }

  // Get user by ID (Admin only)
  @Get(':id')
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update user profile
  @Post('me/update')
  async updateProfile(
    @Req() req,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    const user = await this.userService.findById(req.user.userId);
    return this.userService.update(user.id, updateData);
  }

  // Delete user (Admin only)
  @Post(':id/delete')
  @UseGuards(RolesGuard)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.delete(+id);
  }
}

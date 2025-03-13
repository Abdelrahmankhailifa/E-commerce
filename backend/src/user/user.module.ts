// user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // Add this
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with ConfigService in production
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UserService, JwtAuthGuard],
  controllers: [UserController], // Add this
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}

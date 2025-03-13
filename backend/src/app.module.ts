import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { BillingModule } from './billing/billing.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Boody@2003',
      database: 'items',
      autoLoadEntities: true,
      synchronize: true, // For development only; disable in production
    }),
    ProductModule,
    CartModule,
    OrderModule,
    UserModule,
    AuthModule,
    BillingModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Set a strong secret key
      signOptions: { expiresIn: '24h' }, // Set expiration time for tokens
    }),
  ],
})
export class AppModule {}

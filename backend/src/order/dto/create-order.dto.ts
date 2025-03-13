import { Transform } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  cartId: number;

  @IsArray()
  items: {
    productId: number;
    quantity: number;
    price: number;
    productName: string; // ✅ Add this field
  }[];

  @Transform(({ value }) => parseFloat(value)) // Convert string to number
  @IsNumber()
  total: number;
}

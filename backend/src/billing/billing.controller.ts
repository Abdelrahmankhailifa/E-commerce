import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDetailsDto } from './dto/create-billing.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post(':userId')
  async createBillingDetails(
    @Param('userId') userId: string,
    @Body() createBillingDetailsDto: CreateBillingDetailsDto,
  ) {
    return await this.billingService.createBillingDetails(
      userId,
      createBillingDetailsDto,
    );
  }

  @Get(':userId')
  async getBillingDetails(@Param('userId') userId: string) {
    return await this.billingService.getBillingDetails(userId);
  }

  @Put(':userId')
  async updateBillingDetails(
    @Param('userId') userId: string,
    @Body() updateBillingDetailsDto: Partial<CreateBillingDetailsDto>,
  ) {
    return await this.billingService.updateBillingDetails(
      userId,
      updateBillingDetailsDto,
    );
  }

  @Delete(':userId')
  async deleteBillingDetails(@Param('userId') userId: string) {
    return await this.billingService.deleteBillingDetails(userId);
  }
}

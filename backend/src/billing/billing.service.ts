import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingDetails } from '../entities/billing.entity';
import { CreateBillingDetailsDto } from './dto/create-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingDetails)
    private billingRepository: Repository<BillingDetails>,
  ) {}

  async createBillingDetails(
    userId: string,
    createBillingDetailsDto: CreateBillingDetailsDto,
  ) {
    // Check if user already has billing details
    const existingDetails = await this.billingRepository.findOne({
      where: { userId: Number(userId) },
    });

    if (existingDetails) {
      throw new Error('Billing details already exist for this user');
    }

    const billingDetails = this.billingRepository.create({
      userId: Number(userId),
      ...createBillingDetailsDto,
    });

    return await this.billingRepository.save(billingDetails);
  }

  async getBillingDetails(userId: string) {
    const billingDetails = await this.billingRepository.findOne({
      where: { userId: Number(userId) },
    });

    if (!billingDetails) {
      throw new NotFoundException('Billing details not found');
    }

    return billingDetails;
  }

  async updateBillingDetails(
    userId: string,
    updateBillingDetailsDto: Partial<CreateBillingDetailsDto>,
  ) {
    const billingDetails = await this.getBillingDetails(userId);

    Object.assign(billingDetails, updateBillingDetailsDto);
    return await this.billingRepository.save(billingDetails);
  }

  async deleteBillingDetails(userId: string) {
    const billingDetails = await this.getBillingDetails(userId);
    await this.billingRepository.remove(billingDetails);
    return { message: 'Billing details deleted successfully' };
  }
}

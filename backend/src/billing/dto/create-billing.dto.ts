import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateBillingDetailsDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  country: string;

  @IsString()
  streetAddress: string;

  @IsString()
  townCity: string;

  @IsString()
  stateCounty: string;

  @IsString()
  postcodeZip: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  emailAddress: string;
}

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsOptional()
  @IsString()
  person: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  postal: string;

  @IsOptional()
  @IsNumber()
  num: number;

  @IsOptional()
  date: Date;

  @IsOptional()
  invoiceDueDate: Date;

  @IsOptional()
  rows: {
    quantity: number;
    price: number;
    title: string;
    description: string;
    product: string;
  }[];

  @IsOptional()
  @IsString()
  note: string;
}

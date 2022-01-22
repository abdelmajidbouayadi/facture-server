import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsOptional()
  @IsString()
  person: string;

  @IsOptional()
  @IsString()
  num: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsDate()
  invoiceDueDate: Date;

  @IsOptional()
  rows: {
    quantity: number;
    price: number;
    product: string;
  }[];

  @IsOptional()
  @IsString()
  note: string;
}

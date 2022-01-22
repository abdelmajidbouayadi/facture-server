import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title: string;
  @IsOptional()
  @IsString()
  readonly description: string;
  @IsOptional()
  @IsNumber()
  readonly sellingPrice: number;
  @IsOptional()
  @IsNumber()
  readonly costPrice: number;

  @IsOptional()
  @IsString()
  readonly barcode: string;
}

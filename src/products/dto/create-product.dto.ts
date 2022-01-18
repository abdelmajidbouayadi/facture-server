import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
}

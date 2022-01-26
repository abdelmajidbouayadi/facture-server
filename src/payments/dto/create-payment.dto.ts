import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
enum Type {
  received = 'received',
  made = 'made',
}

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  date: Date;

  @IsString()
  person: string;

  @IsEnum(Type)
  type: Type;
}

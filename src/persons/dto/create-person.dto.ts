import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  companyName: string;
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
  @IsString()
  @MaxLength(20)
  mobilePhone: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  workPhone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsBoolean()
  customer: boolean;

  @IsBoolean()
  vendor: boolean;
}

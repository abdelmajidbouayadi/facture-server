import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePersonDto {
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
  @IsString({ each: true })
  @MaxLength(20, { each: true })
  tel: string[];
}

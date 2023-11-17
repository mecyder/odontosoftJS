import { IsString, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNumber()
  @IsPositive()
  companyId: number;
}

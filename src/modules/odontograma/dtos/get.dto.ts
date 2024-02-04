import { IsNumber, IsPositive, IsString } from 'class-validator';

export class IOdontogramaDto {
  @IsNumber()
  @IsPositive()
  DienteNo: number;
  @IsNumber()
  @IsPositive()
  Procedimiento: number;
  @IsString()
  Sintomas: string;
  @IsString()
  Observaciones: string;
}

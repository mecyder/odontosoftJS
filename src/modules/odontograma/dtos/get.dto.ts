import { IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';

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
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id?: number;
  @IsOptional()
  @IsString()
  procedureDescription?: string;
}

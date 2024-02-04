import { IsNumber, IsPositive, IsString } from 'class-validator';

export class Add {
  @IsNumber()
  @IsPositive()
  tooth: number;
  @IsNumber()
  @IsPositive()
  procedureId: number;
  @IsString()
  symptoms: string;
  @IsString()
  observations: string;
}

import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { MensualFrequencyEnum } from 'src/shared/enums/menstrual-frequency';

export class PersonalBackgroundAdd {
  @IsBoolean()
  _pregunta1: boolean;
  @IsString()
  _commentario1: string;
  @IsBoolean()
  _pregunta2: boolean;
  @IsString()
  _commentario2: string;
  @IsBoolean()
  _pregunta3: boolean;
  @IsString()
  _commentario3: string;
  @IsBoolean()
  _pregunta4: boolean;
  @IsString()
  _commentario4: string;
  @IsBoolean()
  _pregunta5: boolean;
  @IsString()
  _commentario5: string;
  @IsBoolean()
  _pregunta6: boolean;
  @IsString()
  _commentario6: string;
  @IsBoolean()
  _pregunta7: boolean;
  @IsString()
  _commentario7: string;
  @IsBoolean()
  _pregunta8: boolean;
  @IsString()
  _commentario8: string;
  _frequencyMenstrual: string;
  @IsDate()
  _fechaUltimoPeriodo: Date;
  @IsBoolean()
  _embarazada: boolean;
  @IsNumber()
  _numeroSemanasEmbarazo: number;

  @IsBoolean()
  _isBreastfeeding: boolean;
  @IsNumber()
  _clientId: number;

}

import { IsString } from 'class-validator';

export interface IADD {
  cabeza: string;
  cara: string;
  cuello: string;
  lengua: string;
  paladar: string;
  otros: string;
  createdBy: number;
  pacienteId: number;
}

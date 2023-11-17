import { IRol } from './index';
import { IDoctorList } from './doctor.dto';

export interface IListUser {
  Estado: boolean;
  Usuario: string;
  userId: number;
  Ultima_Coneccion: string;
  Company: {
    Id: number;
    Nombre: string;
    Correo: string;
    Identificacion: string;
    Logo: string;
    Telefono: string;
    Eslogan: string;
    Estado: boolean;
    Web: string;
    Direccion: string;
  };
  Roles: IRol[];
  Doctor: IDoctorList;
}

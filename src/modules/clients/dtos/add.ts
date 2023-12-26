export interface IAdd {
  name: string;
  identification: string;
  movilPhone: string;
  phone: string;
  address: string;
  hasWhatsapp: boolean;
  birthDay: Date;
  sex: string;
  Email: string;
  code: string;
  profession: string;
  doctorId: number;
  emergency_contact?: {
    name: string;
    phone: string;
    movil: string;
  };
}

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from '../../database/entities';
import { IResponse } from 'src/shared/interfaces/response';
import * as moment from 'moment';
import { IEdit, IAdd } from '../dtos';
import { SexEnum } from '../enums/sex';
import { CompanyService } from 'src/modules/company/services/company.service';
import { ICompany } from 'src/modules/company/dtos/company.dto';
import { DoctorService } from 'src/modules/doctor/service/service.service';
@Injectable()
export class ClientsService {
  constructor(
    @Inject('CLIENTS_REPOSITORY') private clientRepository: Repository<Clients>,
    private companyService: CompanyService,
    private readonly doctorService: DoctorService,
  ) { }

  async findAll(companyId: number): Promise<IResponse<Clients[]>> {
    const response: IResponse<Clients[]> = { success: false, data: null };

    try {
      const CLIENTS = await this.clientRepository.find({
        where: { status: true, company: { id: companyId } },
      });
      response.data = CLIENTS;
      response.success = true;
      response.total = CLIENTS.length;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async findById(id: number, companyId: number): Promise<IResponse<Clients>> {
    const response: IResponse<Clients> = { success: false, data: null };

    try {
      const CLIENT = await this.clientRepository.findOne({
        where: {
          id,
          status: true,
          company: { id: companyId },
        },
      });
      response.data = CLIENT;
      response.success = true;
      response.total = CLIENT ? 1 : 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async findByIdentification(
    identification: string,
    companyId: number,
  ): Promise<IResponse<Clients>> {
    const response: IResponse<Clients> = { success: false, data: null };

    try {
      const CLIENT = await this.clientRepository.findOne({
        where: { identification, company: { id: companyId } },
      });
      response.data = CLIENT;
      response.success = true;
      response.total = CLIENT ? 1 : 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async findByName(
    name: string,
    companyId: number,
  ): Promise<IResponse<Clients>> {
    const response: IResponse<Clients> = { success: false, data: null };

    try {
      const CLIENT = await this.clientRepository.findOne({
        where: { name, company: { id: companyId } },
      });
      response.data = CLIENT;
      response.success = true;
      response.total = CLIENT ? 1 : 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async findByCode(
    code: string,
    companyId: number,
  ): Promise<IResponse<Clients>> {
    const response: IResponse<Clients> = { success: false, data: null };

    try {
      const CLIENT = await this.clientRepository.findOne({
        where: {
          code: code,
          status: true,
          company: { id: companyId },
        },
      });
      response.data = CLIENT;
      response.success = true;
      response.total = CLIENT ? 1 : 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }
  async add(
    client: IAdd,
    companyId: number,
    createBy: number,
  ): Promise<IResponse<Clients>> {
    const response: IResponse<Clients> = { success: false, data: null };
    try {
      const COUNT_EXIST = await this.clientRepository.count({
        where: {
          identification: client.identification,
          company: { id: companyId },
        },
      });
      if (COUNT_EXIST > 0) {
        response.errors = [
          {
            code: 401,
            message: 'Cliente existente',
            razon: 'Cliente existente',
          },
        ];
        return response;
      }
      const COMPANY_DB = this.companyService.findOneEntity(companyId);
      const DOCTOR_DB = this.doctorService.getById(client.doctorId, companyId);
      const COMPANY_DOCTOR_DB = await Promise.all([COMPANY_DB, DOCTOR_DB]);
      if (COMPANY_DOCTOR_DB[0] === null) {
        response.errors = [
          {
            code: 401,
            message: 'No Encontrado',
            razon: 'Consultorio no encontrado',
          },
        ];
      }

      if (COMPANY_DOCTOR_DB[1].total == 0) {
        response.errors = [
          {
            code: 401,
            message: 'No Encontrado',
            razon: 'Doctor no encontrado',
          },
        ];
      }
      let clientObj: Clients;
      client.birthDay = moment(client.birthDay).toDate();
      client.sex = client.sex === 'F' ? SexEnum.Femenino : SexEnum.Masculino;

      const obj2: Clients = Object.assign({}, clientObj, client);
      const clientToAdd = await this.clientRepository.create(obj2);
      clientToAdd.phone = client.phone;
      clientToAdd.movil = client.movilPhone;
      clientToAdd.hasWhatsapp = client.hasWhatsapp;
      clientToAdd.profession = client.profession;

      clientToAdd.createBy = createBy;
      clientToAdd.code = await this.generateCode(client, companyId);
      clientToAdd.company = COMPANY_DOCTOR_DB[0];
      clientToAdd.doctor =
        client?.doctorId !== 0 ? COMPANY_DOCTOR_DB[1]?.data : null;
      response.data = await this.clientRepository.save(clientToAdd);
      response.success = true;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async edit(
    id: number,
    client: Partial<IEdit>,
    companyId: number,
  ): Promise<IResponse<number>> {
    const response: IResponse<number> = { success: false, data: null };

    try {
      const CLIENT_IN_DB = await this.findById(id, companyId);
      if (CLIENT_IN_DB.total === 0) {
        response.errors = [
          {
            code: HttpStatus.NOT_FOUND,
            message: 'Cliente no encontrado',
            razon: 'Cliente no existe en base de datos',
          },
        ];
      }
      client.sex = client?.sex === 'm' ? SexEnum.Masculino : SexEnum.Femenino;
      const UPDATED = await this.clientRepository.update(id, client);
      response.data = UPDATED.affected;
      response.success = UPDATED.affected > 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }
  async getLastMaxId(companyId: number): Promise<string> {
    const MAX_ID = await this.clientRepository.findOne({
      where: { company: { id: companyId } },
      select: ['id'],
    });
    return (MAX_ID.id + 1).toString();
  }
  async generateCode(client: IAdd, companyId: number): Promise<string> {
    const NAMES = client.name.split(' ');
    const name1 = NAMES[0][0];
    const name2 = NAMES[1][0];

    const YEAR_BIRTHDAY = client.birthDay.getFullYear().toString();
    const DAY_BIRTHDAY = client.birthDay.getDay().toString();
    const MONTH_BIRTHDAY = client.birthDay.getMonth().toString();
    const MAX_ID = await this.getLastMaxId(companyId);
    const paddedStr = MAX_ID.padStart(4, '0');
    const CODE = name1.concat(
      name2,
      YEAR_BIRTHDAY,
      DAY_BIRTHDAY,
      MONTH_BIRTHDAY,
      paddedStr,
    );
    return CODE;
  }
}

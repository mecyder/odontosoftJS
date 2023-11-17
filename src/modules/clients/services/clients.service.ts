import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from '../../database/entities';
import { IResponse } from 'src/shared/interfaces/response';
import * as moment from 'moment';
import { IEdit, IAdd } from '../dtos';
import { SexEnum } from '../enums/sex';
import { CompanyService } from 'src/modules/company/services/company.service';
import { ICompany } from 'src/modules/company/dtos/company.dto';
@Injectable()
export class ClientsService {
  constructor(
    @Inject('CLIENTS_REPOSITORY') private clientRepository: Repository<Clients>,
    private companyService: CompanyService,
  ) {}

  async findAll(): Promise<IResponse<Clients[]>> {
    const response: IResponse<Clients[]> = { success: false, data: null };

    try {
      const CLIENTS = await this.clientRepository.find({
        where: { status: true },
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
  ): Promise<IResponse<Clients>> {
    const response: IResponse<Clients> = { success: false, data: null };

    try {
      const CLIENT = await this.clientRepository.findOne({
        where: { identification },
      });
      response.data = CLIENT;
      response.success = true;
      response.total = CLIENT ? 1 : 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async findByName(name: string): Promise<IResponse<Clients>> {
    const response: IResponse<Clients> = { success: false, data: null };

    try {
      const CLIENT = await this.clientRepository.findOne({
        where: { name },
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
      }
      const COMPANY_DB = await this.companyService.findOneEntity(companyId);
      if (!COMPANY_DB) {
        response.errors = [
          {
            code: 401,
            message: 'Cliente existente',
            razon: 'Cliente existente',
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
      clientToAdd.code = await this.generateCode(client);
      clientToAdd.company = COMPANY_DB;
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
  async getLastMaxId(): Promise<string> {
    const MAX_ID = await this.clientRepository.maximum('id');
    return MAX_ID.toString();
  }
  async generateCode(client: IAdd): Promise<string> {
    const NAMES = client.name.split(' ');
    const name1 = NAMES[0][0];
    const name2 = NAMES[1][0];

    const YEAR_BIRTHDAY = client.birthDay.getFullYear().toString();
    const DAY_BIRTHDAY = client.birthDay.getDay().toString();
    const MONTH_BIRTHDAY = client.birthDay.getMonth().toString();
    const MAX_ID = await this.getLastMaxId();
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

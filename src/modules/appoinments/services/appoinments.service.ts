import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { Appointment } from 'src/modules/database/entities';
import { Repository } from 'typeorm';
import { IADD, IList } from '../dtos';
import { IResponse } from 'src/shared/interfaces/response';
import * as moment from 'moment';
import { ClientsService } from 'src/modules/clients/services/clients.service';
import { appoimentsStatus } from 'src/shared/enums/appoiments-status.enum';
import { CompanyService } from 'src/modules/company/services/company.service';

@Injectable()
export class AppoinmentsService {
  constructor(
    @Inject('APPOINMENT_REPOSITORY')
    private appoinmentRepository: Repository<Appointment>,
    private readonly clientService: ClientsService,
    private readonly companyService: CompanyService
  ) { }
  async add(appoimentDto: IADD, companyId: number, createBy: number) {
    const response: IResponse<any> = { success: false };
    try {
      if (!appoimentDto) {
        response.errors = [
          {
            code: 400,
            message: 'debes complatar los campos',
            razon: 'modelo invalido',
          },
        ];
      }
      if (!appoimentDto.clientId) {
        response.errors = [
          {
            code: 400,
            message: 'debes complatar los campos',
            razon: 'modelo invalido, falta el cliente para reservar cita',
          },
        ];
      }
      const CLIENT = await this.clientService.findById(
        appoimentDto.clientId,
        companyId,
      );
      if (!CLIENT) {
        response.errors = [
          {
            code: HttpStatus.NOT_FOUND,
            message: 'paciente no encontrado',
            razon: 'este paciente no se encuentra registrado en base de datos',
          },
        ];
      }
      const company = await this.companyService.findOneEntity(companyId);
      const duration = moment.duration(1, 'hour');

      const appoimentToCreate = {
        client: CLIENT.data,
        createBy: createBy,
        createAt: moment(Date.now()).toDate(),
        end: appoimentDto.date,
        endTime: moment(appoimentDto.hour, 'hh:mm A')
          .add(duration)
          .format('hh:mm A'),
        reason: appoimentDto.reason,
        status: true,
        start: appoimentDto.date,
        title: `cita agendada: ${CLIENT.data.name}`,
        startTime: moment(appoimentDto.hour, 'hh:mm A').format('hh:mm A'),
        company,
      };
      const appoimentCreate = await this.appoinmentRepository.create(
        appoimentToCreate,
      );
      const CREATED = await this.appoinmentRepository.save(appoimentCreate);
      if (CREATED) {
        response.success = true;
        response.data = CREATED;
        response.total = 1;
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  private getHourEnd(appoimentDto: IADD) {
    const reservatonTimePlusOneHour = new Date(
      appoimentDto.hour.getTime() + 60 * 60 * 1000,
    );
    const hours = (reservatonTimePlusOneHour.getHours() % 12 || 12)
      .toString()
      .padStart(2, '0');
    const minutes = reservatonTimePlusOneHour
      .getMinutes()
      .toString()
      .padStart(2, '0');
    const hourEnd = `${hours}:${minutes}`;
    return hourEnd;
  }

  async findAll(companyId: number): Promise<IResponse<Appointment[]>> {
    const response: IResponse<Appointment[]> = { success: false, data: null };

    try {
      const APPOINMENTS = await this.appoinmentRepository.find({
        relations: ['client'],
        where: {
          company: { id: companyId, status: true },
          appointmentStatus: 0,
        },
      });
      response.data = APPOINMENTS;
      response.success = true;
      response.total = APPOINMENTS.length;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async findById(id: number): Promise<IResponse<Appointment>> {
    const response: IResponse<Appointment> = { success: false, data: null };

    try {
      const APPOINMENT = await this.appoinmentRepository.findOne({
        where: { id: id },
      });
      response.data = APPOINMENT;
      response.success = true;
      response.total = APPOINMENT ? 1 : 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }
}

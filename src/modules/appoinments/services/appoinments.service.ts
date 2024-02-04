import { Injectable, Inject, HttpStatus, HttpCode } from '@nestjs/common';
import { Appointment } from 'src/modules/database/entities';
import { LessThan, Repository } from 'typeorm';
import { IADD, IList } from '../dtos';
import { IResponse } from 'src/shared/interfaces/response';
import * as moment from 'moment';
import { ClientsService } from 'src/modules/clients/services/clients.service';
import { appoimentsStatus } from 'src/shared/enums/appoiments-status.enum';
import { CompanyService } from 'src/modules/company/services/company.service';
import { DoctorService } from 'src/modules/doctor/service/service.service';
import { UPDATE_TYPE } from '../enums/update.enum';
import { EmailService } from 'src/modules/email/Service/email.service';

@Injectable()
export class AppoinmentsService {
  constructor(
    @Inject('APPOINMENT_REPOSITORY')
    private appoinmentRepository: Repository<Appointment>,
    private readonly clientService: ClientsService,
    private readonly companyService: CompanyService,
    private readonly doctorService: DoctorService,
    private readonly emailService: EmailService,
  ) {}
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
            message: 'Paciente no encontrado',
            razon: 'Este paciente no se encuentra registrado en base de datos',
          },
        ];
      }

      const DOCTOR = await this.doctorService.getById(
        appoimentDto.doctorId,
        companyId,
      );
      if (!DOCTOR) {
        response.errors = [
          {
            code: HttpStatus.NOT_FOUND,
            message: 'Doctor no encontrado',
            razon: 'Este doctor no se encuentra registrado en base de datos',
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
        title: `${CLIENT.data.name}`,
        startTime: moment(appoimentDto.hour, 'hh:mm A').format('hh:mm A'),
        doctor: DOCTOR.data,
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
        relations: [
          'client',
          'doctor',
          'client.personalBackground',
          'client.ailments',
          'client.ailments.ailmentsAlerts',
          'client.vital_sings',
          'client.physicalExam',
          'client.physicalConditionObservations'

        ],
        where: {
          company: { id: companyId, status: true },
          appointmentStatus: 0,
          start: new Date(),
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

  async findAllByDoctor(
    companyId: number,
    doctorId: number,
  ): Promise<IResponse<Appointment[]>> {
    const response: IResponse<Appointment[]> = { success: false, data: null };

    try {
      const APPOINMENTS = await this.appoinmentRepository.find({
        relations: [
          'client',
          'doctor',
          'client.personalBackground',
          'client.ailments',
          'client.ailments.ailmentsAlerts',
          'client.vital_sings',
          'client.physicalExam',
          'client.physicalConditionObservations'
        ],
        where: {
          company: { id: companyId, status: true },
          appointmentStatus: 1,
          start: new Date(),
          doctor: {
            id: doctorId,
          },
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
        relations: [
          'client',
          'doctor',
          'client.personalBackground',
          'client.ailments',
          'client.ailments.ailmentsAlerts',
          'client.vital_sings',
          'client.physicalExam',
          'client.physicalConditionObservations'

        ],
      });
      response.data = APPOINMENT;
      response.success = true;
      response.total = APPOINMENT ? 1 : 0;
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  async updateReservationStatus({
    id,
    companyId,
    statusCode,
  }): Promise<IResponse<boolean>> {
    const response: IResponse<boolean> = { success: false };
    try {
      const APPOINTMENT_DB = await this.appoinmentRepository.findOne({
        where: { id, company: { id: companyId } },
      });
      if (!APPOINTMENT_DB) {
        response.errors = [
          {
            code: 0,
            message: 'No Encontrado',
            razon: 'cita no encontrada',
          },
        ];
        return response;
      }
      APPOINTMENT_DB.appointmentStatus = statusCode;
      const UPDATED = await this.appoinmentRepository.update(
        id,
        APPOINTMENT_DB,
      );
      response.data = UPDATED.affected > 0;
      response.success = true;
    } catch (error) {
      response.errors = [
        {
          code: 0,
          message: `Ocurrrio un error`,
          razon: error.message,
        },
      ];
      return response;
    }
    return response;
  }
  async updateReservationDate({
    id,
    companyId,
    newDate,
    starHour,
    updateType,
  }): Promise<IResponse<any>> {
    const response: IResponse<any> = { success: false };
    const duration = moment.duration(1, 'hour');

    try {
      let APPOINTMENT_DB = await this.appoinmentRepository.findOne({
        where: { id, company: { id: companyId } },
      });
      if (!APPOINTMENT_DB) {
        response.errors = [
          {
            code: 0,
            message: 'No Encontrado',
            razon: 'cita no encontrada',
          },
        ];
        return response;
      }
      if (updateType === UPDATE_TYPE.date) {
        APPOINTMENT_DB = {
          ...APPOINTMENT_DB,
          start: newDate,
          end: newDate,
        };
      }
      if (updateType === UPDATE_TYPE.hour) {
        APPOINTMENT_DB = {
          ...APPOINTMENT_DB,
          startTime: moment.utc(starHour).format('hh:mm A'),
          endTime: moment.utc(starHour).add(duration).format('hh:mm A'),
        };
      }

      const UPDATED = await this.appoinmentRepository.update(
        id,
        APPOINTMENT_DB,
      );
      this.emailService.getInstance().send('hola');
      response.data = UPDATED.affected > 0;
      response.success = true;
    } catch (error) {
      response.errors = [
        {
          code: 0,
          message: `Ocurrrio un error`,
          razon: error.message,
        },
      ];
    }
    return response;
  }
}

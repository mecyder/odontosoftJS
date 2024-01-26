import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { VitalSings } from 'src/modules/database/entities';
import { Repository } from 'typeorm';
import { IListVitalSigns } from '../dtos/vitals.signs.dto';
import { IResponse } from 'src/shared/interfaces/response';
import { IAdd } from '../dtos/add.dto';
import { ClientsService } from 'src/modules/clients/services/clients.service';
@Injectable()
export class VitalSignsService {
  constructor(
    @Inject('VITALSIGNS_REPOSITORY')
    private vitalSingsRepository: Repository<VitalSings>,
    private clientService: ClientsService,
  ) { }

  async findOne(patientId: number, companyId: number) {
    const response: IResponse<IListVitalSigns> = {
      success: false,
      data: {
        hgWeight: 0,
        minBloodPressure: 0,
        minBreathingFrequency: 0,
        pulsations: 0,
      },
      errors: undefined,
    };
    const RESULT = await this.vitalSingsRepository.findOne({
      where: {
        client: { id: patientId, company: { id: companyId } },
        status: true,
      },
    });
    if (RESULT) {
      response.errors = [
        {
          message: `No existe registro con patientId ${patientId}`,
          code: HttpStatus.NOT_FOUND,
          razon: 'No existen registros',
        },
      ];
    }
    response.page = 1;
    response.pageSize = 1;
    response.total = 1;
    response.success = true;

    response.data = {
      hgWeight: RESULT.hgWeight,
      minBloodPressure: RESULT.minBloodPressure,
      minBreathingFrequency: RESULT.minBreathingFrequency,
      pulsations: RESULT.pulsations,
    };

    return RESULT;
  }
  async findAll(companyId: number, page = 1, pageSize = 10) {
    const response: IResponse<IListVitalSigns[]> = {
      success: false,
      data: [],
      errors: undefined,
    };
    const RESULT = await this.vitalSingsRepository.find({
      where: { client: { company: { id: companyId } }, status: true },
    });
    if (RESULT.length === 0) {
      response.errors = [
        {
          message: 'No existen registros',
          code: HttpStatus.NOT_FOUND,
          razon: 'No existen registros',
        },
      ];
    }
    response.page = page;
    response.pageSize = pageSize;
    response.total = RESULT.length;
    response.success = true;
    RESULT.forEach((item) => {
      response.data.push({
        hgWeight: item.hgWeight,
        minBloodPressure: item.minBloodPressure,
        minBreathingFrequency: item.minBreathingFrequency,
        pulsations: item.pulsations,
      });
    });
    return RESULT;
  }

  async add(companyId: number, payload: IAdd, createBy: number) {
    const response: IResponse<IListVitalSigns> = {
      success: false,
      data: {
        hgWeight: 0,
        minBloodPressure: 0,
        minBreathingFrequency: 0,
        pulsations: 0,
      },
      errors: undefined,
    };
    try {
      const EXISTS = await this.vitalSingsRepository.findOne({
        where: {
          client: { id: payload.patientId, company: { id: companyId } },
          status: true,
        },
      });
      if (EXISTS) {
        response.errors = [
          {
            code: HttpStatus.BAD_REQUEST,
            message: 'Hubo un error al momento de crear el registro',
            razon: 'ya existe un registro para ese paciente',
          },
        ];
        return response;
      }
      const CLIENT = await this.clientService.findById(
        payload.patientId,
        companyId,
      );

      const VITAL_SING_TO_ADD: Partial<VitalSings> = {
        minBloodPressure: payload.presion,
        minBreathingFrequency: payload.respiracion,
        pulsations: payload.pulsaciones,
        hgWeight: payload.peso,
        client: CLIENT?.data,
        createAt: new Date(),
        createBy: createBy,
        status: true,
      };
      const objToCreate = await this.vitalSingsRepository.create(
        VITAL_SING_TO_ADD,
      );

      const CREATED = await this.vitalSingsRepository.save(objToCreate);
      response.data = CREATED;
      response.success = true;
      response.total = 1;
    } catch (error) {
      response.errors = [
        {
          code: error.statusCode,
          message: 'Hubo un error al momento de crear el registro',
          razon: error.message,
        },
      ];
    }
    return response;
  }
}

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Odontograma } from 'src/modules/database/entities';
import { Repository } from 'typeorm';
import { IOdontogramaDto } from '../dtos';
import { IResponse } from 'src/shared/interfaces/response';
import { Add } from '../dtos/add.dto';
import { ClientsService } from 'src/modules/clients/services/clients.service';
import { STATUS_CODES } from 'http';

@Injectable()
export class OdontogramaService {
  constructor(
    @Inject('ODONTOGRAMA_REPOSITORY')
    private odontogramaRepository: Repository<Odontograma>,
    private patientsService: ClientsService,
  ) {}

  async add(
    companyId: number,
    patientsId: number,
    odontograma: Add,
    creator: number,
  ) {
    const response: IResponse<IOdontogramaDto> = {
      success: false,
      errors: [
        {
          code: 1,
          message: 'Hubo error al agregar el registro',
          razon: '',
        },
      ],
    };
    try {
      const dtoToEntityObject: Partial<Odontograma> = {
        observations: odontograma.observations,
        tooth: odontograma.tooth,
        symptoms: odontograma.symptoms,
        createAt: new Date(),
        patients: (await this.patientsService.findById(patientsId, companyId))
          .data,
        createBy: creator,
        isDone: false,
      };
      const CREATED = await this.odontogramaRepository.save(
        this.odontogramaRepository.create(dtoToEntityObject),
      );
      response.success = CREATED.id > 0;
      response.data = {
        DienteNo: odontograma.tooth,
        Observaciones: odontograma.observations,
        Procedimiento: odontograma.procedureId,
        Sintomas: odontograma.symptoms,
      };
      response.total = CREATED.id > 0 ? 1 : 0;
      response.page = CREATED.id > 0 ? 1 : 0;
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

  async findAll(companyId: number, patientId: number) {
    const response: IResponse<IOdontogramaDto[]> = {
      success: false,
      data: [
        {
          DienteNo: 0,
          Observaciones: '',
          Procedimiento: 0,
          Sintomas: '',
        },
      ],
    };
    try {
      const RESULT = await this.odontogramaRepository.findAndCount({
        where: {
          patients: { id: patientId, company: { id: companyId } },
          status: true,
        },
        relations: ['procedure'],
      });
      if (RESULT[1] === 0) {
        response.errors = [
          {
            code: HttpStatus.NOT_FOUND,
            message: 'No existen registros para mostrar',
            razon: 'no existen registros para mostrar',
          },
        ];
        return response;
      }
      RESULT[0].forEach((item: Odontograma) => {
        response.data.push({
          DienteNo: item?.tooth,
          Observaciones: item?.observations,
          procedureDescription: item?.procedure?.description,
          Sintomas: item?.symptoms,
          id: item?.id,
          Procedimiento: item?.procedure?.id,
        });
      });
      response.success = true;
      response.total = RESULT[1];
    } catch (error) {
      response.errors = [
        {
          code: error.statusCode,
          message: 'Hubo un error al momento de consultar los registros',
          razon: error.message,
        },
      ];
    }
    return response;
  }
}

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PhysicalConditionObservations } from 'src/modules/database/entities/physical.conditions.observations.entity';
import { IResponse } from 'src/shared/interfaces/response';
import { Repository } from 'typeorm';
import { IGET } from '../dtos/get.dto';
import { ClientsService } from 'src/modules/clients/services/clients.service';
import { IADD } from '../dtos/add.dto';

@Injectable()
export class PhysicalConditionObservationsService {
  constructor(
    @Inject('PHYSYCAL_CONDITIONS_OBSERVATIONS_REPOSITORY')
    private physicalConditionsObservationsRepository: Repository<PhysicalConditionObservations>,
    private clientService: ClientsService,
  ) {}

  async add(
    companyId: number,
    payload: IADD,
    userCreator: number,
    pacienteId: number,
  ) {
    const response: IResponse<IGET> = this.createReponseObj();
    try {
      const EXISTS =
        await this.physicalConditionsObservationsRepository.findOne({
          where: {
            client: { id: pacienteId, company: { id: companyId } },
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

      this;
      const CREATED = await this.physicalConditionsObservationsRepository.save(
        this.physicalConditionsObservationsRepository.create(
          await this.createObjectPhysicalConditionsObservationsToAdd(
            payload,
            companyId,
            userCreator,
            pacienteId,
          ),
        ),
      );
      response.data = payload;
      response.success = CREATED.id > 0;
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

  private createReponseObj(): IResponse<IGET> {
    return {
      success: false,
      data: {
        descripcion: '',
      },
      errors: undefined,
    };
  }

  private async createObjectPhysicalConditionsObservationsToAdd(
    payload: IADD,
    companyId: number,
    userCreator: number,
    pacienteId: number,
  ): Promise<Partial<PhysicalConditionObservations>> {
    const client = await this.clientService.findById(pacienteId, companyId);
    return {
      description: payload.descripcion,
      client: client?.data,
      createAt: new Date(),
      createBy: userCreator,
      status: true,
    };
  }
}

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PhysicalExam } from 'src/modules/database/entities';
import { Repository } from 'typeorm';
import { IADD } from '../dtos/add.dto';
import { IResponse } from 'src/shared/interfaces/response';
import { IGET } from '../dtos/get.dto';
import { ClientsService } from 'src/modules/clients/services/clients.service';

@Injectable()
export class PhysicalExamsService {
  constructor(
    @Inject('PHYSYCAL_EXAMNS_REPOSITORY')
    private physicalExamsRepository: Repository<PhysicalExam>,
    private clientService: ClientsService,
  ) {}
  async add(companyId: number, payload: IADD, userCreator: number) {
    const response: IResponse<IGET> = this.createReponseObj();
    try {
      const EXISTS = await this.physicalExamsRepository.findOne({
        where: {
          client: { id: payload.pacienteId, company: { id: companyId } },
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

      const PHYSYCAL_EXAMNS_TO_ADD: Partial<PhysicalExam> =
        await this.createObjectPhysicalExamnsToAdd(
          payload,
          companyId,
          userCreator,
        );
      const objToCreate = await this.physicalExamsRepository.create(
        PHYSYCAL_EXAMNS_TO_ADD,
      );

      const CREATED = await this.physicalExamsRepository.save(objToCreate);
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
        cabeza: '',
        cara: '',
        cuello: '',
        lengua: '',
        otros: '',
        paladar: '',
      },
      errors: undefined,
    };
  }

  private async createObjectPhysicalExamnsToAdd(
    payload: IADD,
    companyId: number,
    userCreator: number,
  ): Promise<Partial<PhysicalExam>> {
    const client = await this.clientService.findById(
      payload.pacienteId,
      companyId,
    );
    return {
      face: payload.cara,
      head: payload.cabeza,
      language: payload.lengua,
      neck: payload.cuello,
      other: payload.otros,
      palate: payload.paladar,
      client: client?.data,
      createAt: new Date(),
      createBy: userCreator,
      status: true,
    };
  }
}

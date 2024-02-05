import { Inject, Injectable } from '@nestjs/common';
import { Odontograma } from 'src/modules/database/entities';
import { Repository } from 'typeorm';
import { IOdontogramaDto } from '../dtos';
import { IResponse } from 'src/shared/interfaces/response';
import { Add } from '../dtos/add.dto';
import { ClientsService } from 'src/modules/clients/services/clients.service';

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
  }
}

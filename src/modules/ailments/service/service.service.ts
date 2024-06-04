import { Inject, Injectable } from '@nestjs/common';
import { ClientsService } from 'src/modules/clients/services/clients.service';
import { Ailments } from 'src/modules/database/entities/ailments.entity';
import { IResponse } from 'src/shared/interfaces/response';
import { Repository } from 'typeorm';

@Injectable()
export class AilmentsService {
  constructor(
    @Inject('AILMENTS_REPOSITORY')
    private ailmentsRepository: Repository<Ailments>,
    private clientService: ClientsService,
  ) {}
  async findAll(companyId: number, patientId: number) {
    return await this.ailmentsRepository.find({
      where: { client: { company: { id: companyId }, id: patientId } },
    });
  }
  async add(
    companyId: number,
    ailments: any,
    clientId: number,
    createBy: number,
  ) {
    const response: IResponse<any> = {
      success: true,
    };
    const ALIMENT_TO_CREATE: Partial<Ailments> = {
      ...ailments,
      client: (await this.clientService.findById(clientId, companyId)).data,
      createAt: new Date(),
      createBy,
    };

    const EXIST = await this.ailmentsRepository.findOne({
      where: {
        client: { id: clientId, company: { id: companyId }, status: true },
      },
    });
    if (EXIST) {
      ALIMENT_TO_CREATE.modifyAt = new Date();
      ALIMENT_TO_CREATE.modifyBy = createBy;
      const ISUPDATED = await this.ailmentsRepository.update(
        { id: EXIST.id },
        ALIMENT_TO_CREATE,
      );
      if (ISUPDATED.affected > 0) {
        response.data = ALIMENT_TO_CREATE;
        response.page = 1;
        response.total = 1;
        response.success = true;
        return response;
      }
    }
    const ISCREATED = await this.ailmentsRepository.save(
      this.ailmentsRepository.create(ALIMENT_TO_CREATE),
    );
    response.data = ISCREATED;
    response.page = 1;
    response.total = 1;
    response.success = true;
  }
}

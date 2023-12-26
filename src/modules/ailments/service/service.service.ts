import { Inject, Injectable } from '@nestjs/common';
import { Ailments } from 'src/modules/database/entities/ailments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AilmentsService {
  constructor(
    @Inject('AILMENTS_REPOSITORY')
    private ailmentsRepository: Repository<Ailments>,
  ) {}
  findAll(companyId: number) {
    return this.ailmentsRepository.find();
  }
  add(companyId: number, ailments: any) {
    return this.ailmentsRepository.save(ailments);
  }
}

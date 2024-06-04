import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Files } from '../../database/entities/index';
import { ClientsService } from 'src/modules/clients/services/clients.service';
@Injectable()
export class FilesService {
  constructor(
    @Inject('FILES_REPOSITORY')
    private fileRepository: Repository<File>,
    private clientService: ClientsService,
  ) {}

  async upload(file: any, clientId: number, companyId: number) {
    if (!clientId) {
      return false;
    }
    const cliente = await this.clientService.findById(clientId, companyId);

    const FILE_TO_LOAD: Partial<Files> = {
      status: true,
      createAt: new Date(),
      createBy: 0,
      file: file,
      name: file.name,
      client: cliente.data,
    };
    const result = await this.fileRepository.save(
      this.fileRepository.create(FILE_TO_LOAD),
    );
    return result;
  }
}

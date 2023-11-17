import { Inject, Injectable } from '@nestjs/common';
import { Doctor } from 'src/modules/database/entities';
import { IResponse } from 'src/shared/interfaces/response';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('DOCTOR_REPOSITORY')
    private doctorRepository: Repository<Doctor>,
  ) {}

  async getById(id: number, companyId: number) {
    const response: IResponse<Doctor> = { success: false };
    if (id === 0) {
      response.errors = [
        { code: 1, message: 'No Encontrado', razon: 'debes proporcionar id ' },
      ];
      return response;
    }
    if (companyId === 0) {
      response.errors = [
        {
          code: 1,
          message: 'No Encontrado',
          razon: 'debes proporcionar company id ',
        },
      ];
      return response;
    }

    try {
      const doctor = await this.doctorRepository.findOne({
        where: { id: id, status: true, user: { company: { id: companyId } } },
      });
      response.data = doctor;
      response.total = 1;
    } catch (error) {
      response.errors = [
        { code: 1, message: 'Ocurrio un error', razon: error.message },
      ];
      return response;
    }
    return response;
  }
}

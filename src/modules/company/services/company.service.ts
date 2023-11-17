import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/modules/database/entities/';
import { Repository } from 'typeorm';
import { ICompany } from '../dtos/company.dto';
import { IResponse } from 'src/shared/interfaces/response';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) { }
  async findOne(companyId: number): Promise<IResponse<ICompany>> {
    // eslint-disable-next-line prefer-const
    let response: IResponse<ICompany> = {
      success: false,
      data: {
        Id: 0,
        Web: '',
        Correo: '',
        Direccion: '',
        Eslogan: '',
        Identificacion: '',
        Logo: '',
        Nombre: '',
        Telefono: '',
      },
    };
    try {
      const COMPANY_RESULT = await this.companyRepository.findOne({
        where: {
          id: companyId,
          status: true,
        },
      });
      if (!COMPANY_RESULT) {
        response.errors = [
          {
            code: 1,
            message: 'Consultorio no encontrado',
            razon: 'no existe consultorio en DB',
          },
        ];
        return response;
      }
      response.data = {
        Id: COMPANY_RESULT.id,
        Nombre: COMPANY_RESULT.name,
        Telefono: COMPANY_RESULT.phone,
        Correo: COMPANY_RESULT.email,
        Direccion: COMPANY_RESULT.address,
        Web: COMPANY_RESULT.urlPage,
        Eslogan: COMPANY_RESULT.slogan,
        Identificacion: COMPANY_RESULT.identification,
        Logo: COMPANY_RESULT.logo,
      };
      response.success = true;
      response.total = 1;
    } catch (error) {
      response.errors = [
        { code: 1, message: error.message, razon: error.message },
      ];
    }
    return response;
  }
  async findAll(companyId: number): Promise<IResponse<ICompany[]>> {
    // eslint-disable-next-line prefer-const
    let response: IResponse<ICompany[]> = { success: false, data: [] };
    try {
      const COMPANY_LIST = await this.companyRepository.find({
        where: { id: companyId, status: true },
      });

      COMPANY_LIST.forEach(async (company: Company) => {
        response.data.push({
          Id: company?.id,
          Nombre: company?.name,
          Correo: company?.email,
          Identificacion: company?.identification,
          Eslogan: company?.slogan,
          Telefono: company?.phone,
          Web: company?.urlPage,
          Direccion: company?.address,
          Logo: company?.logo,
        });
      });
      response.total = 1;
      response.success = true;
    } catch (error) {
      response.errors = [
        { code: 1, message: error.message, razon: error.message },
      ];
    }
    return response;
  }

  async findOneEntity(companyId: number): Promise<Company | any> {
    let response: Company;
    try {
      const COMPANY_RESULT = await this.companyRepository.findOne({
        where: {
          id: companyId,
          status: true,
        },
      });
      if (!COMPANY_RESULT) {
        return [
          {
            code: 1,
            message: 'Consultorio no encontrado',
            razon: 'no existe consultorio en DB',
          },
        ];
      }
      return COMPANY_RESULT;
    } catch (error) {
      return [
        {
          code: 1,
          message: 'Error al realiazar la consulta',
          razon: error.message,
        },
      ];
    }
  }

  //   async add(company: IADD, companyId: number) {
  //     // eslint-disable-next-line prefer-const
  //     let response: IResponse<company> = { success: false };

  //     try {
  //       const encriptedPassword = await passwordUtils.encriptar(
  //         company.contrasena,
  //       );
  //       //TODO: agregar la compania
  //       const newcompany = this.companyRepository.create({
  //         createBy: company.creadoPor,
  //         password: encriptedPassword,
  //         status: true,
  //         companyname: company.nombreUsuario,
  //         createAt: new Date(),
  //         last_connection: null,
  //       });
  //       const CREATED = await this.companyRepository.save(newcompany);
  //       response.data = CREATED;
  //     } catch (error) {
  //       response.errors = [
  //         { code: 1, message: error.message, razon: error.message },
  //       ];
  //     }
  //     return response;
  //   }
}

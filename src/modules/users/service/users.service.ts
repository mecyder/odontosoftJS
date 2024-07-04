import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/dtos/login';
import { Rol, User, View } from 'src/modules/database/entities/security';
import { IResponse } from 'src/shared/interfaces/response';
import { Repository } from 'typeorm';
import { IListUser } from '../interfaces/list.dto';
import { IADD } from 'src/modules/users/interfaces';
import { passwordUtils } from 'src/utils/passwordUtils';
import { CompanyService } from 'src/modules/company/services/company.service';
import { DoctorService } from 'src/modules/doctor/service/service.service';
import { RequestPaginationDTO } from 'src/shared/dtos/request.pagination';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
    private readonly companyservice: CompanyService,
    private readonly doctorService: DoctorService,
  ) { }

  async findOne(userDto: LoginDto): Promise<any> {
    // eslint-disable-next-line prefer-const
    let response: IResponse<IListUser> = {
      success: false,
      data: {
        Estado: null,
        Doctor: {
          Id: 0,
          Correo: '',
          Direccion: '',
          Execuator: '',
          Identificacion: '',
          Nombre: '',
          Telefono: '',
          Especialidades: [],
        },
        Company: {
          Id: 0,
          Correo: '',
          Direccion: '',
          Eslogan: '',
          Estado: false,
          Identificacion: '',
          Logo: '',
          Nombre: '',
          Telefono: '',
          Web: '',
        },
        Roles: null,
        Ultima_Coneccion: null,
        Usuario: null,
        userId: 0,
      },
    };
    try {
      const USER = await this.userRepository.findOne({
        where: {
          username: userDto.userName,
        },
        relations: [
          'doctor',
          'doctor.specialities',
          'rols',
          'rols.view',
          'company',
        ],
      });
      if (
        USER !== null &&
        !(await passwordUtils.desencriptar(userDto?.password, USER?.password))
      ) {
        return false;
      }
      if (!USER.company) {
        return false;
      }
      response.data.Usuario = USER.username;
      response.data.Estado = USER.status;
      response.data.userId = USER.id;
      response.data.Ultima_Coneccion =
        USER?.last_connection?.toLocaleDateString();
      response.data.Doctor.Id = USER?.doctor?.id;
      response.data.Doctor.Nombre = USER?.doctor?.name;
      response.data.Doctor.Correo = USER?.doctor?.email;
      response.data.Doctor.Direccion = USER?.doctor?.address;
      response.data.Doctor.Execuator = USER?.doctor?.authorizationNumber;
      response.data.Doctor.Identificacion = USER?.doctor?.identification;
      response.data.Doctor.Telefono = USER?.doctor?.phone;
      (response.data.Doctor.Especialidades = USER?.doctor?.specialities.map(
        (item) => item.description,
      )),
        (response.data.Company.Id = USER?.company?.id);
      response.data.Company.Nombre = USER?.company?.name;
      response.data.Company.Correo = USER?.company?.email;
      response.data.Company.Identificacion = USER?.company?.identification;
      response.data.Company.Eslogan = USER?.company?.slogan;
      response.data.Company.Estado = USER?.company?.status;
      response.data.Company.Telefono = USER?.company?.phone;
      response.data.Company.Web = USER?.company?.urlPage;
      response.data.Company.Direccion = USER?.company?.address;

      response.data.Roles =
        USER.rols.map((rol: Rol) => {
          return {
            Estado: rol.status,
            Nombre: rol.description,
            Recursos:
              rol.view.map((view: View) => {
                return {
                  Estado: view.status,
                  Nombre: view.description,
                };
              }) ?? [],
          };
        }) ?? [];
      response.success = true;
      response.total = 1;
    } catch (error) {
      response.errors = [
        { code: 1, message: error.message, razon: error.message },
      ];
    }
    return response;
  }
  async findAll(
    companyId: number,
    paginationData: RequestPaginationDTO,
  ): Promise<IResponse<IListUser[]>> {
    // eslint-disable-next-line prefer-const
    let response: IResponse<IListUser[]> = { success: false, data: [] };
    const offset = (paginationData.page - 1) * paginationData.limit;

    try {
      const USERS = await this.userRepository.find({
        relations: ['rols', 'rols.view', 'doctor', 'company'],
        where: { company: { id: companyId } },
        skip: offset,
        take: paginationData.limit,
      });

      USERS.forEach(async (user: User) => {
        response.data.push({
          Usuario: user.username,
          userId: user.id,
          Estado: user.status,
          Ultima_Coneccion: user?.last_connection?.toLocaleDateString(),
          Company: {
            Id: user?.company?.id,
            Nombre: user?.company?.name,
            Correo: user?.company?.email,
            Identificacion: user?.company?.identification,
            Eslogan: user?.company?.slogan,
            Estado: user?.company?.status,
            Telefono: user?.company?.phone,
            Web: user?.company?.urlPage,
            Direccion: user?.company?.address,
            Logo: user?.company?.logo,
          },
          Doctor: {
            Id: user?.doctor?.id,
            Nombre: user?.doctor?.name,
            Correo: user?.doctor?.email,
            Telefono: user?.doctor?.phone,
            Direccion: user?.doctor?.address,
            Execuator: user?.doctor?.authorizationNumber,
            Identificacion: user?.doctor?.identification,
            Especialidades: user?.doctor?.specialities?.map((item) => {
              return item.description;
            }),
          },
          Roles:
            user.rols.map((rol: Rol) => {
              return {
                Estado: rol.status,
                Nombre: rol.description,
                Recursos:
                  rol.view.map((view: View) => {
                    return {
                      Estado: view.status,
                      Nombre: view.description,
                    };
                  }) ?? [],
              };
            }) ?? [],
        });
      });

      response.total = USERS.length;
      response.success = true;
      response.page = paginationData.page;
      response.pageSize = paginationData.limit;
    } catch (error) {
      response.errors = [
        { code: 1, message: error.message, razon: error.message },
      ];
    }
    return response;
  }

  async add(user: IADD, companyId: number) {
    // eslint-disable-next-line prefer-const
    let response: IResponse<User> = { success: false };

    try {
      const company = this.companyservice.findOneEntity(companyId);
      const doctor = this.doctorService.getById(user.doctorId, companyId);
      const resultDoctorAndCompany = await Promise.all([company, doctor]);
      if (resultDoctorAndCompany[0].code == 1) {
        response.errors = [
          { code: 1, message: 'No Encontrado', razon: 'empresa no encontrada' },
        ];
        return response;
      }
      if (resultDoctorAndCompany[1].total == 0) {
        response.errors = [
          { code: 1, message: 'No Encontrado', razon: 'empresa no encontrada' },
        ];
        return response;
      }
      const encriptedPassword = await passwordUtils.encriptar(user.contrasena);
      const newUser = this.userRepository.create({
        createBy: user.creadoPor,
        password: encriptedPassword,
        status: true,
        username: user.nombreUsuario,
        createAt: new Date(),
        last_connection: null,
        company: resultDoctorAndCompany[0],
        doctor: resultDoctorAndCompany[1].data,
      });
      const CREATED = await this.userRepository.save(newUser);
      //TODO: retornar un DTO
      response.success = true;
      response.total = 1;
      response.data = CREATED;
    } catch (error) {
      response.errors = [
        { code: 1, message: error.message, razon: error.message },
      ];
    }
    return response;
  }
}

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Template } from 'src/modules/database/entities/template.entity';
import { Repository } from 'typeorm';
import { IList } from '../dtos/list.dto';
import { IResponse } from 'src/shared/interfaces/response';
import { IAdd } from '../dtos/add.dto';

@Injectable()
export class TemplateService {
  constructor(
    @Inject('TEMPLATE_REPOSITORY')
    private templateRepository: Repository<Template>,
  ) { }

  async find(companyId: number) {
    const response: IResponse<IList[]> = { success: false, data: [] };
    const resultTemplate = await this.templateRepository.find({
      where: { companyId, status: true },
    });
    if (resultTemplate.length == 0) {
      response.errors = [
        {
          code: HttpStatus.NOT_FOUND,
          message: 'No existen plantillas',
          razon: 'No existen plantillas',
        },
      ];
      return response;
    }

    resultTemplate.forEach((element) => {
      response.data.push({
        contenido: element.html,
        nombre: element.name,
        id: element.id,
      });
      response.total = resultTemplate.length;
      response.success = true;
    });
    return response;
  }
  async findOne(templateId: number, companyId: number) {
    const response: IResponse<IList> = {
      success: false,
      data: {
        contenido: '',
        nombre: '',
        id: 0,
      },
    };
    const resultTemplate = await this.templateRepository.findOne({
      where: { companyId, status: true, id: templateId },
    });
    if (!resultTemplate) {
      response.errors = [
        {
          code: HttpStatus.NOT_FOUND,
          message: 'Plantilla no encontrada',
          razon: 'Plantilla no encontrada',
        },
      ];
      return response;
    }

    response.data.id = resultTemplate.id;
    response.data.contenido = resultTemplate.html;
    response.data.nombre = resultTemplate.name;
    response.total = 1;
    response.success = true;

    return response;
  }
  async findByName(name: string, companyId: number) {
    // eslint-disable-next-line prefer-const
    let response: IResponse<IList> = {
      success: false,
      data: {
        contenido: '',
        nombre: '',
        id: 0,
      },
    };
    const resultTemplate = await this.templateRepository.findOne({
      where: { companyId, status: true, name },
    });
    if (!resultTemplate) {
      response.errors = [
        {
          code: HttpStatus.NOT_FOUND,
          message: 'Plantilla no encontrada',
          razon: 'Plantilla no encontrada',
        },
      ];
      return response;
    }

    response.data.id = resultTemplate.id;
    response.data.contenido = resultTemplate.html;
    response.data.nombre = resultTemplate.name;
    response.total = 1;
    response.success = true;

    return response;
  }
  async update(templateId: number, companyId: number, newContent: string) {
    const response: IResponse<number> = { success: false };
    const resultTemplate = await this.templateRepository.findOne({
      where: { companyId, status: true, id: templateId },
    });
    if (!resultTemplate) {
      response.errors = [
        {
          code: 0,
          message: 'Plantilla no encontrada',
          razon: 'Plantilla no encontrada',
        },
      ];
      return response;
    }
    resultTemplate.html = newContent;
    const UPDATED = await this.templateRepository.update(
      templateId,
      resultTemplate,
    );

    response.data = UPDATED.affected;
    response.success = UPDATED.affected > 0;
    response.total = 1;
    response.success = true;

    return response;
  }
  async disable(templateId: number, companyId: number) {
    const response: IResponse<number> = { success: false };
    const resultTemplate = await this.templateRepository.findOne({
      where: { companyId, status: true, id: templateId },
    });
    if (!resultTemplate) {
      response.errors = [
        {
          code: 0,
          message: 'Plantilla no encontrada',
          razon: 'Plantilla no encontrada',
        },
      ];
      return response;
    }
    resultTemplate.status = false;
    const UPDATED = await this.templateRepository.update(
      templateId,
      resultTemplate,
    );

    response.data = UPDATED.affected;
    response.success = UPDATED.affected > 0;
    response.total = 1;
    response.success = true;

    return response;
  }
  async add(companyId: number, template: IAdd) {
    const response: IResponse<Template> = {
      success: false,
      data: {
        html: '',
        companyId: 0,
        createBy: 0,
        name: '',
        id: 0,
        createAt: new Date(),
        modifyAt: null,
        modifyBy: null,
        status: false,
      },
      errors: [
        {
          code: 1,
          message: '',
          razon: '',
        },
      ],
    };

    try {
      console.log(template.name);
      const exist = await this.templateRepository.find({
        where: { name: template['name'], companyId, status: true },
      });
      if (exist.length > 0) {
        response.errors.push({
          code: 1,
          message: 'Existe un template con este nombre',
          razon: 'Existe un template con este nombre',
        });
        return response;
      }
      const templateToAdd: Partial<Template> = {
        companyId,
        html: template.content,
        name: template.name,
        createBy: template.creator,
        createAt: new Date(),
      };
      const inserted = await this.templateRepository.save(templateToAdd);
      if (inserted.id) {
        response.data = inserted;
        response.success = true;
        response.total = 1;
      }
    } catch (error) {
      response.errors.push({
        code: 1,
        message: 'Hubo un error al agregar template',
        razon: error.message,
      });
    }
    return response;
  }
}

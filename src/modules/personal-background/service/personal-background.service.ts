import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PersonalBackgroundAdd } from '../dtos/add.input';
import { PersonalBackground } from '../../database/entities';
import { ClientsService } from '../../clients/services/clients.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PersonalBackgroundService {
  constructor(
    @Inject('PERSONAL_BACKGROUND_REPOSITORY')
    private personalBackgroundService: Repository<PersonalBackground>,
    private clientService: ClientsService,
  ) { }

  async add(
    payload: PersonalBackgroundAdd,
    companyId: number,
    userCreator: number,
  ) {
    const client = await this.clientService.findById(
      payload._clientId,
      companyId,
    );
    const PersonalBackground: Partial<PersonalBackground> = {
      question1: payload._pregunta1,
      question2: payload._pregunta2,
      question3: payload._pregunta3,
      question4: payload._pregunta4,
      question5: payload._pregunta5,
      question6: payload._pregunta6,
      question7: payload._pregunta7,
      question8: payload._pregunta8,
      coment1: payload._commentario1,
      comment2: payload._commentario2,
      comment3: payload._commentario3,
      comment4: payload._commentario4,
      comment5: payload._commentario5,
      comment6: payload._commentario6,
      comment7: payload._commentario7,
      comment8: payload._commentario8,
      client: client.data,
      isBreastfeeding: payload._isBreastfeeding,
      isPregnant: payload._embarazada,
      lastPeriodDate: payload._fechaUltimoPeriodo,
      menstrualFrequency: payload._frequencyMenstrual,
      numberOfWeeks: payload._numeroSemanasEmbarazo,
      status: true,

    };
    const REGISTER = await this.findOne(payload._clientId, companyId);
    if (REGISTER) {
      PersonalBackground.modifyBy = userCreator;
      PersonalBackground.modifyAt = new Date();
      const ISUPDATED = await this.personalBackgroundService.update(
        REGISTER.id,
        PersonalBackground,
      );
      if (ISUPDATED.affected > 0) {
        return true;
      }
    } else {
      PersonalBackground.createBy = userCreator;
      PersonalBackground.createAt = new Date();
      const IS_SAVED = await this.personalBackgroundService.insert(
        PersonalBackground,
      );
      return IS_SAVED.identifiers[0].id > 0;
    }
  }
  async findOne(clientId: number, companyId: number) {
    return this.personalBackgroundService.findOne({
      where: {
        client: { id: clientId, company: { id: companyId } },
        status: true,
      },
      relations: ['client'],
    });
  }
}

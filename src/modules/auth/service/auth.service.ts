import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login';
import { passwordUtils } from 'src/utils/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(userDto: LoginDto): Promise<any> {
    const USER = await this.usersService.findOne(userDto);
    if (!USER && USER === false) {
      throw new UnauthorizedException('Password incorrecto');
    }
    if (!USER || USER?.errors?.length > 0) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: USER.data.userId,
      username: USER.data.Usuario,
      roles: USER.data.Roles,
      company: USER.data.Company,
      doctor: USER.data.doctor,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

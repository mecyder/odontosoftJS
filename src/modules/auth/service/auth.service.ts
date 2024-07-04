import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login';
import { jwtConstants } from '../constanst';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(userDto: LoginDto): Promise<any> {
    const USER = await this.usersService.findOne(userDto);

    if (!USER || USER?.errors?.length > 0) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    if (USER.data.Roles.length === 0) {
      throw new InternalServerErrorException();
    }
    const payload = {
      sub: USER.data.userId,
      username: USER.data.Usuario,
      roles: USER.data.Roles,
      company: USER.data.Company,
      doctor: USER.data.Doctor,
    };

    const TOKENS = await Promise.all([
      // Token de acceso expira en 1 hora
      this.jwtService.signAsync(payload, {
        expiresIn: '24h',
        secret: jwtConstants.secret,
      }),
      // Refresh token expira en 7 días
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: jwtConstants.secret,
      }),
    ]);

    return {
      access_token: TOKENS[0],
      refresh_token: TOKENS[1],
    };
  }
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      // Verifica el token de refresco para obtener el payload
      const decoded = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secret, // Debes usar la clave secreta adecuada para el token de refresco
      });

      // Prepara el payload para el nuevo token de acceso
      const payload = {
        sub: decoded.sub,
        username: decoded.username,
        roles: decoded.roles,
        company: decoded.company,
        doctor: decoded.doctor,
      };

      // Genera un nuevo token de acceso con el mismo payload
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1m', // Nuevo token de acceso expira en 1 minuto
        secret: jwtConstants.secret, // Debes usar la clave secreta adecuada para el token de acceso
      });

      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}

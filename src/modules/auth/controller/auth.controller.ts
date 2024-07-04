import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Public } from '../decorator/meta-data-decorator';
import { LoginDto } from '../dtos/login';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/refresh-token')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    const accessToken = await this.authService.refreshAccessToken(refreshToken);
    return { access_token: accessToken };
  }
}

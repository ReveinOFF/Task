import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/core/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() reg: AuthDto) {
    return await this.authService.signup(reg);
  }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() auth: AuthDto) {
    return await this.authService.signin(auth);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { ForgetPasswordAuthDto } from './dto/forgetPasswordAuth.dto';
import { ResetPasswordAuthDto } from './dto/resetPasswordAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordAuthDto: ForgetPasswordAuthDto) {
    return this.authService.forgetPassword(forgetPasswordAuthDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordAuthDto: ResetPasswordAuthDto) {
    return this.authService.resetPassword(resetPasswordAuthDto);
  }
}

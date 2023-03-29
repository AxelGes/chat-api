import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() req: LoginDto) {
    return this.authService.login(req);
  }
}

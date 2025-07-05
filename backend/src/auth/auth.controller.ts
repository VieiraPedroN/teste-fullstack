import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  usuario: Pick<Usuario, 'id' | 'nome' | 'email' | 'tipo'>;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@CurrentUser() user: Usuario) {
    return user;
  }
}

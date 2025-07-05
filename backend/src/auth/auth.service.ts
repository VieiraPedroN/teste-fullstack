import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(dto: LoginDto) {
    this.validateLogin(dto);

    const usuario = await this.usuarioService.findByEmail(dto.email);
    if (!usuario || !(await bcrypt.compare(dto.senha, usuario.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      tipo: usuario.tipo,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET ?? 'chave-secreta',
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-token',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    };
  }

  async refreshToken(token: string) {
    try {
      type JwtPayload = {
        sub: string;
        email: string;
        tipo: 'ADMIN' | 'USER';
      };

      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-token',
      });

      if (
        !payload ||
        typeof payload.sub !== 'string' ||
        typeof payload.email !== 'string' ||
        (payload.tipo !== 'ADMIN' && payload.tipo !== 'USER')
      ) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      const usuario = await this.usuarioService.findOne(payload.sub);
      if (!usuario) {
        throw new UnauthorizedException();
      }

      const newAccessToken = this.jwtService.sign(
        { sub: usuario.id, email: usuario.email, tipo: usuario.tipo },
        { secret: process.env.JWT_SECRET ?? 'chave-secreta', expiresIn: '15m' },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  validateLogin(dto: LoginDto) {
    if (!dto.email?.includes('@')) {
      throw new BadRequestException('E-mail inválido');
    }
    if (!dto.senha || dto.senha.length < 6) {
      throw new BadRequestException('Senha muito curta');
    }
  }
}

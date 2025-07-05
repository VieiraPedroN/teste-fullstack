import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from '../usuario/entities/usuario.entity';

export const CurrentUser = createParamDecorator(
  (
    _data: unknown,
    ctx: ExecutionContext,
  ): Pick<Usuario, 'id' | 'email' | 'nome' | 'tipo'> => {
    const request = ctx.switchToHttp().getRequest<{ user: Usuario }>();
    return request.user;
  },
);

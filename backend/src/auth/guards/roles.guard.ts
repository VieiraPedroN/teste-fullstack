import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      Array<Usuario['tipo']>
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<{ user: Usuario }>();
    const user = request.user;

    if (!user || !requiredRoles.includes(user.tipo)) {
      throw new ForbiddenException('Acesso negado.');
    }

    return true;
  }
}

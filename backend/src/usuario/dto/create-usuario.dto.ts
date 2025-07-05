import { TipoUsuario } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
}

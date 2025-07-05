import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, TipoUsuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    this.validateCreate(createUsuarioDto);

    const senhaHash = await bcrypt.hash(createUsuarioDto.senha, 10);
    const novo = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: senhaHash,
      tipo: createUsuarioDto.tipo ?? TipoUsuario.USER,
    });
    return this.usuarioRepository.save(novo);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new BadRequestException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, dto);
    const usuario = await this.findOne(id);

    if (dto.senha) {
      dto.senha = await bcrypt.hash(dto.senha, 10);
    }

    const updatedUsuario = { ...usuario, ...dto };
    return this.usuarioRepository.save(updatedUsuario);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`Usuário com ID ${id} não encontrado`);
    }
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  validateCreate(dto: CreateUsuarioDto) {
    if (!dto.nome?.trim()) {
      throw new BadRequestException('Nome é obrigatório');
    }
    if (!dto.email?.includes('@')) {
      throw new BadRequestException('E-mail inválido');
    }
    if (!dto.senha || dto.senha.length < 6) {
      throw new BadRequestException('Senha muito curta');
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';

@Injectable()
export class EspecialidadeService {
  constructor(
    @InjectRepository(Especialidade)
    private especialidadeRepository: Repository<Especialidade>,
  ) {}

  async create(
    createEspecialidadeDto: CreateEspecialidadeDto,
  ): Promise<Especialidade> {
    const especialidade = this.especialidadeRepository.create(
      createEspecialidadeDto,
    );
    return this.especialidadeRepository.save(especialidade);
  }

  async findAll(): Promise<Especialidade[]> {
    return this.especialidadeRepository.find({ relations: ['clinicas'] });
  }

  async findOne(id: string): Promise<Especialidade> {
    const especialidade = await this.especialidadeRepository.findOne({
      where: { id },
      relations: ['clinicas'],
    });
    if (!especialidade) {
      throw new NotFoundException(`Especialidade with ID ${id} not found`);
    }
    return especialidade;
  }

  async update(
    id: string,
    updateEspecialidadeDto: UpdateEspecialidadeDto,
  ): Promise<Especialidade> {
    const especialidade = await this.findOne(id);
    Object.assign(especialidade, updateEspecialidadeDto);
    return this.especialidadeRepository.save(especialidade);
  }

  async remove(id: string): Promise<void> {
    const especialidade = await this.findOne(id);
    await this.especialidadeRepository.remove(especialidade);
  }
}

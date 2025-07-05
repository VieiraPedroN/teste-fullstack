import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, ILike } from 'typeorm';
import { Clinica } from './entities/clinica.entity';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
import { FilterClinicaDto } from './dto/filter-clinica.dto';
import { Regional } from '../regional/entities/regional.entity';
import { Especialidade } from '../especialidade/entities/especialidade.entity';

@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>,

    @InjectRepository(Regional)
    private regionalRepository: Repository<Regional>,

    @InjectRepository(Especialidade)
    private especialidadeRepository: Repository<Especialidade>,
  ) {}

  async create(dto: CreateClinicaDto): Promise<Clinica> {
    const regional = await this.regionalRepository.findOne({
      where: { id: dto.regional_id },
    });
    if (!regional) throw new BadRequestException('Regional não encontrada');

    const especialidades =
      dto.especialidade_id?.length > 0
        ? await this.especialidadeRepository.findByIds(dto.especialidade_id)
        : [];

    const clinica = this.clinicaRepository.create({
      ...dto,
      regional,
      especialidades,
    });

    return this.clinicaRepository.save(clinica);
  }

  async findAll(filter: FilterClinicaDto) {
    const { busca, ativa, page = 1, limit = 10 } = filter;

    const where: {
      razao_social?: any;
      ativa?: boolean;
    } = {};

    if (busca) {
      where.razao_social = ILike(`%${busca}%`);
    }

    if (ativa !== undefined) {
      where.ativa = ativa === 'true';
    }

    const [result, total] = await this.clinicaRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: result,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  async findOne(id: string): Promise<Clinica> {
    const clinica = await this.clinicaRepository.findOne({
      where: { id },
      relations: ['regional', 'especialidades'],
    });
    if (!clinica) throw new NotFoundException('Clínica não encontrada');
    return clinica;
  }

  async update(id: string, dto: UpdateClinicaDto): Promise<Clinica> {
    const clinica = await this.findOne(id);

    const regional = await this.regionalRepository.findOne({
      where: { id: dto.regional_id },
    });
    if (!regional) throw new BadRequestException('Regional não encontrada');

    const especialidades =
      dto.especialidade_id && dto.especialidade_id.length > 0
        ? await this.especialidadeRepository.find({
            where: { id: In(dto.especialidade_id) },
          })
        : [];

    Object.assign(clinica, {
      ...dto,
      regional,
      especialidades,
    });

    return this.clinicaRepository.save(clinica);
  }

  async remove(id: string): Promise<void> {
    const clinica = await this.findOne(id);
    await this.clinicaRepository.remove(clinica);
  }
}

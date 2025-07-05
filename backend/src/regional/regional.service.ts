import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regional } from './entities/regional.entity';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { UpdateRegionalDto } from './dto/update-regional.dto';

@Injectable()
export class RegionalService {
  constructor(
    @InjectRepository(Regional)
    private regionalRepository: Repository<Regional>,
  ) {}
  async create(createRegionalDto: CreateRegionalDto): Promise<Regional> {
    const regional = this.regionalRepository.create(createRegionalDto);
    return this.regionalRepository.save(regional);
  }
  async findAll(): Promise<Regional[]> {
    return this.regionalRepository.find({ relations: ['clinicas'] });
  }
  async findOne(id: string): Promise<Regional> {
    const regional = await this.regionalRepository.findOne({
      where: { id },
      relations: ['clinicas'],
    });
    if (!regional) {
      throw new NotFoundException(`Regional with ID ${id} not found`);
    }
    return regional;
  }
  async update(
    id: string,
    updateRegionalDto: UpdateRegionalDto,
  ): Promise<Regional> {
    const regional = await this.findOne(id);
    Object.assign(regional, updateRegionalDto);
    return this.regionalRepository.save(regional);
  }
  async remove(id: string): Promise<void> {
    const regional = await this.findOne(id);
    await this.regionalRepository.remove(regional);
  }
  async findByName(nome: string): Promise<Regional[]> {
    return this.regionalRepository.find({
      where: { nome },
      relations: ['clinicas'],
    });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EspecialidadeService } from './especialidade.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('especialidades')
export class EspecialidadeController {
  constructor(private readonly especialidadeService: EspecialidadeService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.especialidadeService.create(createEspecialidadeDto);
  }

  @Get()
  findAll() {
    return this.especialidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadeService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateEspecialidadeDto: UpdateEspecialidadeDto,
  ) {
    return this.especialidadeService.update(id, updateEspecialidadeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.especialidadeService.remove(id);
  }
}

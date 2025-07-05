import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
import { FilterClinicaDto } from './dto/filter-clinica.dto';
import { UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('clinicas')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Post()
  @Roles('USER')
  create(@Body() createClinicaDto: CreateClinicaDto) {
    return this.clinicaService.create(createClinicaDto);
  }

  @Get()
  findAll(@Query() filter: FilterClinicaDto) {
    return this.clinicaService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicaService.findOne(id);
  }

  @Put(':id')
  @Roles('USER')
  update(@Param('id') id: string, @Body() updateClinicaDto: UpdateClinicaDto) {
    return this.clinicaService.update(id, updateClinicaDto);
  }

  @Delete(':id')
  @Roles('USER')
  remove(@Param('id') id: string) {
    return this.clinicaService.remove(id);
  }
}

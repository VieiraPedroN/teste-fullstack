import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicaService } from './clinica.service';
import { ClinicaController } from './clinica.controller';
import { Clinica } from './entities/clinica.entity';
import { Regional } from '../regional/entities/regional.entity';
import { Especialidade } from '../especialidade/entities/especialidade.entity';
import { RegionalModule } from '../regional/regional.module';
import { EspecialidadeModule } from '../especialidade/especialidade.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinica, Regional, Especialidade]),
    RegionalModule,
    EspecialidadeModule,
  ],
  controllers: [ClinicaController],
  providers: [ClinicaService],
  exports: [ClinicaService, TypeOrmModule.forFeature([Clinica])],
})
export class ClinicaModule {}

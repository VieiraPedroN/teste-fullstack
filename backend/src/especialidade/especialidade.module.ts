import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { EspecialidadeController } from './especialidade.controller';
import { EspecialidadeService } from './especialidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidade])],
  controllers: [EspecialidadeController],
  providers: [EspecialidadeService],
  exports: [EspecialidadeService, TypeOrmModule.forFeature([Especialidade])],
})
export class EspecialidadeModule {}

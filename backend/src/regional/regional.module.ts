import { Module } from '@nestjs/common';
import { RegionalController } from './regional.controller';
import { RegionalService } from './regional.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regional } from './entities/regional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regional])],
  controllers: [RegionalController],
  providers: [RegionalService],
  exports: [RegionalService, TypeOrmModule.forFeature([Regional])],
})
export class RegionalModule {}

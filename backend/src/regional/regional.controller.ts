import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RegionalService } from './regional.service';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { UpdateRegionalDto } from './dto/update-regional.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('regionais')
export class RegionalController {
  constructor(private readonly regionalService: RegionalService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createRegionalDto: CreateRegionalDto) {
    return this.regionalService.create(createRegionalDto);
  }

  @Get()
  findAll() {
    return this.regionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionalService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateRegionalDto: UpdateRegionalDto,
  ) {
    return this.regionalService.update(id, updateRegionalDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.regionalService.remove(id);
  }
}

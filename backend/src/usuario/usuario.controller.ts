import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }
  @Put(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: CreateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}

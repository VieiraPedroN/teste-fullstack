import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClinicaService } from './clinica/clinica.service';
import { ClinicaController } from './clinica/clinica.controller';
import { ClinicaModule } from './clinica/clinica.module';
import { EspecialidadeController } from './especialidade/especialidade.controller';
import { RegionalController } from './regional/regional.controller';
import { UsuarioController } from './usuario/usuario.controller';
import { EspecialidadeModule } from './especialidade/especialidade.module';
import { RegionalService } from './regional/regional.service';
import { RegionalModule } from './regional/regional.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      migrationsRun: true,
    }),
    ClinicaModule,
    EspecialidadeModule,
    RegionalModule,
    UsuarioModule,
  ],
  controllers: [
    AppController,
    ClinicaController,
    EspecialidadeController,
    RegionalController,
    UsuarioController,
  ],
  providers: [AppService, ClinicaService, RegionalService],
})
export class AppModule {}

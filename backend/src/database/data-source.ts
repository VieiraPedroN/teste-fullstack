import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Especialidade } from '../especialidade/entities/especialidade.entity';
import { Clinica } from '../clinica/entities/clinica.entity';
import { Regional } from '../regional/entities/regional.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Usuario, Especialidade, Clinica, Regional],
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
});

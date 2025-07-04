import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Regional } from '../regional/entities/regional.entity';
import { Especialidade } from '../especialidade/entities/especialidade.entity';
import { Clinica } from '../clinica/entities/clinica.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  entities: [Regional, Especialidade, Clinica],
  migrations: ['src/migrations/*.ts'],
});

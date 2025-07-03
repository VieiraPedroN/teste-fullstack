import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigraçãoBancoPG1751572907109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE regionais (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(100) UNIQUE NOT NULL
      );

      CREATE TABLE especialidades (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(100) UNIQUE NOT NULL
      );

      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        ativo BOOLEAN DEFAULT TRUE,
        tipo VARCHAR(50) NOT NULL
      );

      CREATE TABLE clinicas (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        razao_social VARCHAR(255) NOT NULL,
        nome_fantasia VARCHAR(255) NOT NULL,
        cnpj VARCHAR(18) UNIQUE NOT NULL,
        data_inauguracao DATE NOT NULL,
        ativa BOOLEAN DEFAULT TRUE,
        regional_id UUID NOT NULL REFERENCES regionais(id)
      );

      CREATE TABLE clinicas_especialidades (
        clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
        especialidade_id UUID REFERENCES especialidades(id) ON DELETE CASCADE,
        PRIMARY KEY (clinica_id, especialidade_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS clinicas_especialidades;`);
  }
}

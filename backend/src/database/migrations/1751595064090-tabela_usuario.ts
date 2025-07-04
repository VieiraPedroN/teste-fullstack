import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaUsuario1751595064090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE tipo_usuario AS ENUM ('ADMIN', 'USER');
      CREATE TABLE usuario (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        ativo BOOLEAN DEFAULT TRUE,
        tipo tipo_usuario NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
      CREATE INDEX idx_usuario_email ON usuario(email);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS usuario;`);
    await queryRunner.query(`DROP TYPE IF EXISTS tipo_usuario;`);
  }
}

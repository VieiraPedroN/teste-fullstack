import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaClinica1751595069807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE clinicas (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        razao_social VARCHAR(255) NOT NULL,
        nome_fantasia VARCHAR(255) NOT NULL,
        cnpj VARCHAR(18) UNIQUE NOT NULL,
        data_inauguracao DATE NOT NULL,
        ativa BOOLEAN DEFAULT TRUE,
        regional_id UUID NOT NULL REFERENCES regionais(id),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
      CREATE INDEX idx_clinicas_cnpj ON clinicas(cnpj);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS clinicas;`);
  }
}

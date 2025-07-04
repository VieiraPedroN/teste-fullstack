import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaClinicaEspecialidade1751595079382
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
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

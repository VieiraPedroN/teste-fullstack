import { DataSource } from 'typeorm';
import { Especialidade } from '../../especialidade/entities/especialidade.entity';

export async function seedEspecialidades(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(Especialidade);

  const especialidades = [
    'Cardiologia',
    'Pediatria',
    'Ortopedia',
    'Dermatologia',
    'Ginecologia',
    'Neurologia',
    'Oftalmologia',
    'Psiquiatria',
    'Urologia',
    'Endocrinologia',
  ];

  for (const nome of especialidades) {
    const existe = await repo.findOneBy({ nome });
    if (!existe) {
      const nova = repo.create({ nome });
      await repo.save(nova);
      console.log(`Especialidade inserida: ${nome}`);
    } else {
      console.log(`Especialidade já existe: ${nome}`);
    }
  }
}

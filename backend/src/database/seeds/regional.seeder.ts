import { DataSource } from 'typeorm';
import { Regional } from '../../regional/entities/regional.entity';

export async function seedRegionais(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Regional);

  const regionais = [
    'Alto tietê',
    'Interior',
    'ES',
    'SP Interior',
    'SP',
    'SP2',
    'MG',
    'Nacional',
    'SP CAV',
    'RJ',
    'SP1',
    'NE1',
    'NE2',
    'SUL',
    'Norte',
  ];

  for (const nome of regionais) {
    const existe = await repo.findOneBy({ nome });
    if (!existe) {
      const nova = repo.create({ nome });
      await repo.save(nova);
      console.log(`Regional inserida: ${nome}`);
    } else {
      console.log(`Regional já existe: ${nome}`);
    }
  }
}

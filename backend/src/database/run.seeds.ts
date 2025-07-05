import { AppDataSource } from './data-source';
import { seedRegionais } from './seeds/regional.seeder';
import { seedEspecialidades } from './seeds/especialidade.seeder';

export async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log('Plantando seeds...');

    await seedRegionais(AppDataSource);
    await seedEspecialidades(AppDataSource);

    console.log('Seeds plantadas!');
  } catch (error) {
    console.error('Erro ao rodar seeds:', error);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}
if (require.main === module) {
  void runSeeds();
}

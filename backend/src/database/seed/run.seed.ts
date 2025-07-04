import { seedRegionais } from './regionais.seed';
import { seedEspecialidades } from './especialidades.seed';
import { AppDataSource } from '../data-source';

void AppDataSource.initialize()
  .then(async () => {
    console.log('📦 Rodando seeds...');
    await seedRegionais(AppDataSource);
    await seedEspecialidades(AppDataSource);
    console.log('✅ Seeds executadas com sucesso!');
    await AppDataSource.destroy();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro ao rodar seeds:', error);
    process.exit(1);
  });

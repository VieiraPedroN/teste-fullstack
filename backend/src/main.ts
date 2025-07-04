import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';
import { seedRegionais } from './database/seeds/regional.seeder';
import { seedEspecialidades } from './database/seeds/especialidade.seeder';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    try {
      await AppDataSource.initialize();

      const regionalRepo = AppDataSource.getRepository('Regional');
      const count = await regionalRepo.count();
      if (count === 0) {
        console.log('Rodando seeds...');
        await seedRegionais(AppDataSource);
        await seedEspecialidades(AppDataSource);
        console.log('Seeds aplicadas com sucesso');
      } else {
        console.log('Seeds já aplicadas, pulando...');
      }

      await AppDataSource.destroy();
    } catch (error) {
      console.error('Erro ao rodar seeds:', error);
    }
  }

  await app.listen(3000);
}
bootstrap();

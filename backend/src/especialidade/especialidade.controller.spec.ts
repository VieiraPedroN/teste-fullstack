import { Test, TestingModule } from '@nestjs/testing';
import { EspecialidadeController } from './especialidade.controller';

describe('EspecialidadeController', () => {
  let controller: EspecialidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecialidadeController],
    }).compile();

    controller = module.get<EspecialidadeController>(EspecialidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

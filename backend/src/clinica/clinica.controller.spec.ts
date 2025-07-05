import { Test, TestingModule } from '@nestjs/testing';
import { ClinicaController } from './clinica.controller';

describe('ClinicaController', () => {
  let controller: ClinicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicaController],
    }).compile();

    controller = module.get<ClinicaController>(ClinicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

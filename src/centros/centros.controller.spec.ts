import { Test, TestingModule } from '@nestjs/testing';
import { CentrosController } from './centros.controller';

describe('CentrosController', () => {
  let controller: CentrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentrosController],
    }).compile();

    controller = module.get<CentrosController>(CentrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

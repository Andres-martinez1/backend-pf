import { Test, TestingModule } from '@nestjs/testing';
import { ElementosController } from './elementos.controller';

describe('ElementosController', () => {
  let controller: ElementosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementosController],
    }).compile();

    controller = module.get<ElementosController>(ElementosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BodegaElementoController } from './bodega-elemento.controller';
import { BodegaElementoService } from './bodega-elemento.service';

describe('BodegaElementoController', () => {
  let controller: BodegaElementoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodegaElementoController],
      providers: [BodegaElementoService],
    }).compile();

    controller = module.get<BodegaElementoController>(BodegaElementoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

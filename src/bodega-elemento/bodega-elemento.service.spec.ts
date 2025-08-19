import { Test, TestingModule } from '@nestjs/testing';
import { BodegaElementoService } from './bodega-elemento.service';

describe('BodegaElementoService', () => {
  let service: BodegaElementoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodegaElementoService],
    }).compile();

    service = module.get<BodegaElementoService>(BodegaElementoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

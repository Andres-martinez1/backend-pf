import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioBodegaController } from './usuario_bodega.controller';

describe('UsuarioBodegaController', () => {
  let controller: UsuarioBodegaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioBodegaController],
    }).compile();

    controller = module.get<UsuarioBodegaController>(UsuarioBodegaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioFichaController } from './usuario_ficha.controller';

describe('UsuarioFichaController', () => {
  let controller: UsuarioFichaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioFichaController],
    }).compile();

    controller = module.get<UsuarioFichaController>(UsuarioFichaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

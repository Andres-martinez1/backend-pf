import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioFichaService } from './usuario_ficha.service';

describe('UsuarioFichaService', () => {
  let service: UsuarioFichaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioFichaService],
    }).compile();

    service = module.get<UsuarioFichaService>(UsuarioFichaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

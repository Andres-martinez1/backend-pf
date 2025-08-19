import { DataSource, DeepPartial } from 'typeorm';
import { Usuarios } from '../usuarios/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

export class UsuarioSeeder {
  static async run(dataSource: DataSource) {
    const usuarioRepo = dataSource.getRepository(Usuarios);

    const correo = 'carlos@gmail.com';
    const userExists = await usuarioRepo.findOne({ where: { correo } });

    if (userExists) {
      console.log(' Usuario ya existe, se omite.');
      return;
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    const usuario = usuarioRepo.create({
      identificacion: '123456789',  
      nombres: 'Carlos',
      apellidos: 'Sterling',
      correo: 'carlos@gmail.com',
      password: hashedPassword,
      fkIdArea: null,
      fkIdRol: { idRol: 1 } as any,
      fkIdPermisos: null,
      img: null,
      estado: 'activo',
      ubicacion: 'Oficina Central',
      fechaIngreso: new Date().toISOString().split('T')[0],
      habilidadesTecnicas: 'Administración',
    } as unknown as DeepPartial<Usuarios>);

    await usuarioRepo.save(usuario); 
    console.log(' Usuario seed creado correctamente!');
  }
}

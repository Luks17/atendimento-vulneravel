import { CreateUsuarioDTO } from "@/lib/DTO/Usuario/CreateUsuarioDTO";
import { dbSource } from "../Connection";
import { Usuario } from "../models/Usuario";

export class UsuarioService {
  static async getAll() {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.find();
  }

  static async findOne(id: string) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.findOne({ where: { id } });
  }

  static async new(dto: CreateUsuarioDTO) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    const entity = usuarioRepository.create({ ...dto });

    await usuarioRepository.save(entity);

    return entity;
  }
}

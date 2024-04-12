import { CreateUsuarioDTO } from "@/lib/DTO/Usuario/CreateUsuarioDTO";
import { dbSource } from "../Connection";
import { Usuario } from "../models/Usuario";
import { FindOptionsWhere } from "typeorm";

export class UsuarioService {
  static async getAll() {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.find();
  }

  static async findOne<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.findOne({ where: condition });
  }

  static async new(dto: CreateUsuarioDTO) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    const entity = usuarioRepository.create({ ...dto });

    await usuarioRepository.save(entity);

    return entity;
  }
}

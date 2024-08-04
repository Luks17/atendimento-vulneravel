import type { CreateUsuarioDTO } from "@/lib/DTO/Usuario/CreateUsuarioDTO";
import { dbSource } from "../Connection";
import { Usuario } from "../models/Usuario";
import type { FindOptionsWhere } from "typeorm";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class UsuarioService {
  static async deleteAll<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    await usuarioRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    const match = await usuarioRepository.findOne({ where: condition });

    if (match) await usuarioRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.findOne({ where: condition });
  }

  static async findAll<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(dto: CreateUsuarioDTO) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    const entity = usuarioRepository.create({ ...dto });

    await usuarioRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<Usuario>,
    U extends QueryDeepPartialEntity<Usuario>,
  >(condition: T, updated: U) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    await usuarioRepository.update(condition, updated);
  }
}

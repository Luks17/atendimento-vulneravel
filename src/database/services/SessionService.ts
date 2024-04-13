import { FindOptionsWhere } from "typeorm";
import { dbSource } from "../Connection";
import { UsuarioSession } from "../models/UsuarioSession";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class SessionService {
  static async deleteAll<T extends FindOptionsWhere<UsuarioSession>>(
    condition: T,
  ) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    await sessionRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<UsuarioSession>>(
    condition: T,
  ) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    const match = await sessionRepository.findOne({ where: condition });

    if (match) await sessionRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<UsuarioSession>>(
    condition: T,
  ) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    return await sessionRepository.findOne({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async findAll<T extends FindOptionsWhere<UsuarioSession>>(
    condition: T,
  ) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    return await sessionRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(id: string, expires_at: Date, usuario_id: string) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    const entity = sessionRepository.create({ id, expires_at, usuario_id });

    await sessionRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<UsuarioSession>,
    U extends QueryDeepPartialEntity<UsuarioSession>,
  >(condition: T, updated: U) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    await sessionRepository.update(condition, updated);
  }
}

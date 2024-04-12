import { LessThan } from "typeorm";
import { dbSource } from "../Connection";
import { UsuarioSession } from "../models/UsuarioSession";

export class SessionService {
  static async deleteAllExpired() {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);
    const now = new Date();

    const expiredSessions = await sessionRepository.find({
      where: { expires_at: LessThan(now) },
    });

    await sessionRepository.remove(expiredSessions);
  }

  static async deleteById(id: string) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    await sessionRepository.delete({ id });
  }

  static async deleteAllByUserId(userId: string) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    await sessionRepository.delete({ usuario_id: userId });
  }

  static async findOne(id: string) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    return await sessionRepository.findOne({
      where: {
        id,
      },
    });
  }

  static async findAllByUserId(userId: string) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    return await sessionRepository.find({ where: { usuario_id: userId } });
  }

  static async new(id: string, expires_at: Date, usuario_id: string) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    const entity = sessionRepository.create({ id, expires_at, usuario_id });

    await sessionRepository.save(entity);

    return entity;
  }

  static async update(id: string, expires_at: Date) {
    const sessionRepository = await dbSource.getRepository(UsuarioSession);

    await sessionRepository.update({ id }, { expires_at });
  }
}

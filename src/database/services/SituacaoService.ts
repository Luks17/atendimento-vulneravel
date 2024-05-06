import { FindOptionsWhere } from "typeorm";
import { dbSource } from "../Connection";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";
import { CreateSituacaoDTO } from "@/lib/DTO/Situacao/CreateSituacaoDTO";
import { Situacao } from "../models/Situacao";

export class SituacaoService {
  static async deleteAll<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const solicitacaoRepository = await dbSource.getRepository(Situacao);

    await solicitacaoRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const solicitacaoRepository = await dbSource.getRepository(Situacao);

    const match = await solicitacaoRepository.findOne({ where: condition });

    if (match) await solicitacaoRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const solicitacaoRepository = await dbSource.getRepository(Situacao);

    return await solicitacaoRepository.findOne({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async findAll<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const solicitacaoRepository = await dbSource.getRepository(Situacao);

    return await solicitacaoRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(dto: CreateSituacaoDTO) {
    const solicitacaoRepository = await dbSource.getRepository(Situacao);

    const entity = solicitacaoRepository.create({ ...dto });

    await solicitacaoRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<Situacao>,
    U extends QueryDeepPartialEntity<Situacao>,
  >(condition: T, updated: U) {
    const solicitacaoRepository = await dbSource.getRepository(Situacao);

    await solicitacaoRepository.update(condition, updated);
  }
}

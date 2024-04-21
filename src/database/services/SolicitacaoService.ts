import { FindOptionsWhere } from "typeorm";
import { dbSource } from "../Connection";
import { Solicitacao } from "../models/Solicitacao";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";
import { CreateSolicitacaoDTO } from "@/lib/DTO/Solicitacao/CreateSolicitacaoDTO";

export class SolicitacaoService {
  static async deleteAll<T extends FindOptionsWhere<Solicitacao>>(
    condition: T,
  ) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    await solicitacaoRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<Solicitacao>>(
    condition: T,
  ) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    const match = await solicitacaoRepository.findOne({ where: condition });

    if (match) await solicitacaoRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<Solicitacao>>(condition: T) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    return await solicitacaoRepository.findOne({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async findAll<T extends FindOptionsWhere<Solicitacao>>(condition: T) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    return await solicitacaoRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(dto: CreateSolicitacaoDTO) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    const entity = solicitacaoRepository.create({ ...dto });

    await solicitacaoRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<Solicitacao>,
    U extends QueryDeepPartialEntity<Solicitacao>,
  >(condition: T, updated: U) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    await solicitacaoRepository.update(condition, updated);
  }
}

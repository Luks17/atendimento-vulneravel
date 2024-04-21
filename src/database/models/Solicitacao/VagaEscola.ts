import { ChildEntity, Column } from "typeorm";
import { Solicitacao, TiposAuxilios } from "../Solicitacao";

@ChildEntity(TiposAuxilios["Vaga para Escola"])
export class VagaEscola extends Solicitacao {
  @Column("int")
  numero_vagas_escola: number;
}

import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";

@ChildEntity()
export class VagaEscola extends Solicitacao {
  @Column("int")
  numero_vagas_escola: number;
}

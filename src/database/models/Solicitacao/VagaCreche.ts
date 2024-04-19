import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";

@ChildEntity()
export class VagaCreche extends Solicitacao {
  @Column("int")
  numero_vagas_creche: number;
}

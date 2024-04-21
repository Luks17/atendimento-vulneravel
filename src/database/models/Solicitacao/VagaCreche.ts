import { ChildEntity, Column } from "typeorm";
import { Solicitacao, TiposAuxilios } from "../Solicitacao";

@ChildEntity(TiposAuxilios["Vaga para Creche"])
export class VagaCreche extends Solicitacao {
  @Column("int")
  numero_vagas_creche: number;
}

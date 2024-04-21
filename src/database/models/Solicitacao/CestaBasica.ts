import { ChildEntity, Column } from "typeorm";
import { Solicitacao, TiposAuxilios } from "../Solicitacao";

@ChildEntity(TiposAuxilios["Cesta Básica"])
export class CestaBasica extends Solicitacao {
  @Column("int")
  quantidade_cestas: number;
}

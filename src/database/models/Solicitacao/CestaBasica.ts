import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";

@ChildEntity()
export class CestaBasica extends Solicitacao {
  @Column("int")
  quantidade_cestas: number;
}

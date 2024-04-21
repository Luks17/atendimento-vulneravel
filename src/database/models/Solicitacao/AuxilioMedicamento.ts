import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";

@ChildEntity()
export class AuxilioMedicamento extends Solicitacao {
  @Column("int")
  vl_auxilio_medicamento: number;
}

import { ChildEntity, Column } from "typeorm";
import { Solicitacao, TiposAuxilios } from "../Solicitacao";

@ChildEntity(TiposAuxilios["Auxílio Medicamento"])
export class AuxilioMedicamento extends Solicitacao {
  @Column("int")
  vl_auxilio_medicamento: number;
}

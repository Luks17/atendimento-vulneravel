import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Solicitacao } from "./Solicitacao";

@Entity("auxilios")
export class Auxilio {
  @PrimaryColumn({ type: "varchar", length: 50 })
  label: string;

  @ManyToMany(() => Solicitacao, (solicitacao) => solicitacao.auxilios)
  solicitacoes: Solicitacao[];
}

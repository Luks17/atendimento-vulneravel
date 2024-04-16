import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Solicitacao } from "./Solicitacao";

@Entity("problemas")
export class Problema {
  @PrimaryColumn({ type: "varchar", length: 50 })
  label: string;

  @ManyToMany(() => Solicitacao, (solicitacao) => solicitacao.problemas)
  solicitacoes: Solicitacao[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  TableInheritance,
} from "typeorm";
import type { Relation } from "typeorm";
import { Usuario } from "./Usuario";

export enum TiposProblemas {
  "Catástrofe" = "catastrofe",
  "Doença" = "doenca",
  "Acidente" = "acidente",
  "Financeiro" = "financeiro",
}

export enum EstadosSolicitacao {
  "Pendente" = "pendente",
  "Reprovada" = "reprovada",
  "Aprovada" = "aprovada",
}

export enum TiposAuxilios {
  "Auxílio Medicamento" = "auxilio_medicamento",
  "Cesta Básica" = "cesta_basica",
  "Vaga para Creche" = "vaga_creche",
  "Vaga para Escola" = "vaga_escola",
}

@Entity("solicitacoes")
@TableInheritance({
  column: "descriminador",
})
export class Solicitacao {
  @PrimaryColumn({ type: "char", length: 36 })
  id: string;

  @Column({ type: "enum", enum: TiposAuxilios, name: "descriminador" })
  descriminador: TiposAuxilios;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: "usuario_id" })
  usuario: Relation<Usuario>;

  @Column({
    type: "enum",
    enum: EstadosSolicitacao,
    default: EstadosSolicitacao.Pendente,
  })
  estado: EstadosSolicitacao;

  @Column({ type: "enum", enum: TiposProblemas })
  tipo_problema: TiposProblemas;

  @Column("text")
  descricao_problema: string;
}

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  TableInheritance,
} from "typeorm";
import { Usuario } from "./Usuario";

export enum TiposProblemas {
  "Catástrofe" = "catastrofe",
  "Doença" = "doenca",
  "Acidente" = "acidente",
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
  column: { type: "enum", enum: TiposAuxilios, name: "descriminador" },
})
export class Solicitacao {
  @PrimaryColumn({ type: "char", length: 36 })
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  usuario_id: string;

  @Column({ type: "enum", enum: EstadosSolicitacao })
  estado: EstadosSolicitacao;

  @Column({ type: "enum", enum: TiposProblemas })
  tipo_problema: TiposProblemas;

  @Column("text")
  descricao_problema: string;
}

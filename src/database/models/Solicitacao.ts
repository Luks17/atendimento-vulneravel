import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Problema } from "./Problema";
import { Auxilio } from "./Auxilio";

export enum TiposProblemas {
  "Catástrofe" = "catastrofe",
  "Doença" = "doenca",
  "Acidente" = "acidente",
}

@Entity("solicitacoes")
export class Solicitacao {
  @PrimaryColumn({ type: "char", length: 36 })
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  usuario_id: string;

  @Column({ type: "enum", enum: TiposProblemas })
  tipo_problema: TiposProblemas;

  @ManyToMany(() => Problema, (problema) => problema.solicitacoes, {
    cascade: true,
  })
  @JoinColumn()
  problemas: Problema[];

  @ManyToMany(() => Auxilio, (auxilio) => auxilio.solicitacoes, {
    cascade: true,
  })
  @JoinColumn()
  auxilios: Auxilio[];
}

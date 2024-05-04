import { MinLength } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Solicitacao } from "./Solicitacao";
import { Situacao } from "./Situacao";

@Entity("usuarios")
export class Usuario {
  @PrimaryColumn({ type: "char", length: 36 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  @MinLength(2)
  nome: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  email: string;

  @Column({ type: "char", unique: true, length: 14 })
  cpf: string;

  @Column({ type: "char", unique: true, length: 15 })
  phone: string;

  @Column({ type: "varchar", length: 255 })
  @MinLength(6)
  passwd: string;

  @OneToMany(() => Solicitacao, (solicitacao) => solicitacao.id)
  solicitacoes: Solicitacao[];

  @OneToOne(() => Situacao)
  situacao: Situacao;
}

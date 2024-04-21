import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Usuario } from "./Usuario";
import { IsPositive, Min } from "class-validator";

export enum MoradiaEnum {
  "Casa Própria" = "casa_propria",
  "Aluguel" = "aluguel",
}

@Entity("situacoes")
export class Situacao {
  @OneToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Relation<Usuario>;

  @PrimaryColumn({ type: "char", length: 36 })
  usuario_id: string;

  @Column({ type: "enum", enum: MoradiaEnum })
  moradia: MoradiaEnum;

  @Column("int")
  @IsPositive()
  total_adultos: number;

  @Column("int")
  @Min(0)
  total_criancas: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  @Min(0)
  renda_familiar: number;

  @Column({ type: "decimal", precision: 10, scale: 3, nullable: true })
  @IsPositive()
  valor_aluguel: number;
}

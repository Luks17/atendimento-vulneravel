import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { IsPositive, Min } from "class-validator";

export enum MoradiaEnum {
  "Casa Própria" = "casa_propria",
  "Aluguel" = "aluguel",
}

@Entity("situacoes")
export class Situacao {
  @PrimaryColumn({ type: "char", length: 36 })
  @OneToOne(() => Usuario, (usuario) => usuario.id)
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

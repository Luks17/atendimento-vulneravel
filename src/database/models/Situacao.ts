import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { IsPositive } from "class-validator";

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
}

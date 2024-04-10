import { MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryColumn({ type: "char", length: 36 })
  id: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  @MinLength(2)
  nome: string;

  @Column({ type: "varchar", length: 255 })
  passwd: string;
}

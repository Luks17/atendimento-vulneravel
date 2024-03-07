import { MoradiaValues } from "@/lib/forms/cadastrar-vulneravel/options";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vulneravel {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  nome: string;

  @Column()
  total_adultos: string;

  @Column({ type: "enum", enum: MoradiaValues })
  moradia: typeof MoradiaValues;
}

import {
  MoradiaEnum,
  PerdasCatastrofesEnum,
} from "@/lib/forms/cadastrar-vulneravel/options";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vulneravel {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 155 })
  nome: string;

  @Column("int")
  total_adultos: number;

  @Column({ type: "enum", enum: MoradiaEnum })
  moradia: MoradiaEnum;

  @Column("simple-array")
  problemas_saude_familia: string[];

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  despesas_saude: number;

  @Column({ type: "enum", enum: PerdasCatastrofesEnum })
  perdas_catastrofes: PerdasCatastrofesEnum;

  @Column({ type: "boolean" })
  cesta_basica: boolean;
}

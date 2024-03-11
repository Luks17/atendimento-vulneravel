import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsPositive, MinLength } from "class-validator";
import { ProblemaSaude } from "./ProblemaSaude";

export enum MoradiaEnum {
  "Casa Própria" = "casa_propria",
  "Aluguel" = "aluguel",
}

export enum PerdasCatastrofesEnum {
  "Nenhum" = "nenhum",
  "Incêndio" = "incendio",
  "Temporal" = "temporal",
  "Enchente" = "enchente",
}

@Entity("vulneraveis")
export class Vulneravel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 155 })
  @MinLength(2)
  nome: string;

  @Column("int")
  @IsPositive()
  total_adultos: number;

  @Column({ type: "enum", enum: MoradiaEnum })
  moradia: MoradiaEnum;

  @Column({ type: "decimal", precision: 10, scale: 3, nullable: true })
  @IsPositive()
  despesas_saude: number;

  @Column({ type: "enum", enum: PerdasCatastrofesEnum })
  perdas_catastrofes: PerdasCatastrofesEnum;

  @Column({ type: "boolean" })
  cesta_basica: boolean;

  @ManyToMany(
    () => ProblemaSaude,
    (problemaSaude) => problemaSaude.vulneraveis,
    {
      cascade: true,
    },
  )
  @JoinTable()
  tipos: ProblemaSaude[];
}

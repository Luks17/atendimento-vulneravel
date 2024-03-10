import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  nome: string;

  @Column("int")
  total_adultos: number;

  @Column({ type: "enum", enum: MoradiaEnum })
  moradia: MoradiaEnum;

  @Column("simple-array")
  problemas_saude_familia: string[];

  @Column({ type: "decimal", precision: 10, scale: 3, nullable: true })
  despesas_saude: number;

  @Column({ type: "enum", enum: PerdasCatastrofesEnum })
  perdas_catastrofes: PerdasCatastrofesEnum;

  @Column({ type: "boolean" })
  cesta_basica: boolean;
}

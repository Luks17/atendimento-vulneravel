import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Vulneravel } from "./Vulneravel";

@Entity("problemas_saude")
export class ProblemaSaude {
  @PrimaryColumn({ type: "varchar", length: 50 })
  tipo: string;

  @ManyToMany(() => Vulneravel, (vulneravel) => vulneravel.tipos)
  vulneraveis: Vulneravel[];
}

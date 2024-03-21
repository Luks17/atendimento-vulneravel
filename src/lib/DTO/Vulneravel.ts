import { ProblemaSaude } from "@/database/models/ProblemaSaude";
import {
  MoradiaEnum,
  PerdasCatastrofesEnum,
} from "@/database/models/Vulneravel";
import { NextRequest } from "next/server";
import { CadastrarVulneravelFormData } from "../forms/cadastrar-vulneravel/schema";

export class CreateVulneravelDTO {
  constructor(
    public nome: string,
    public total_adultos: number,
    public moradia: MoradiaEnum,
    public despesas_saude: number | undefined,
    public perdas_catastrofes: PerdasCatastrofesEnum,
    public cesta_basica: boolean,

    public tipos: ProblemaSaude[],
  ) {}

  static async fromFormData(data: CadastrarVulneravelFormData) {
    const tipos = data.problemas_saude_familia.map((tipo: string) => {
      let Problema = new ProblemaSaude();
      Problema.tipo = tipo;

      return Problema;
    });

    return new this(
      data.nome,
      data.total_adultos,
      data.moradia,
      data.despesas_saude,
      data.perdas_catastrofes,
      data.cesta_basica,

      tipos,
    );
  }

  static async fromRequest(request: NextRequest) {
    try {
      const data: CadastrarVulneravelFormData = await request.json();
      return this.fromFormData(data);
    } catch (e) {
      throw new Error("Invalid Request Body");
    }
  }
}

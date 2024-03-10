import {
  MoradiaEnum,
  PerdasCatastrofesEnum,
} from "@/database/models/Vulneravel";
import { NextRequest } from "next/server";

export class CreateVulneravelDTO {
  constructor(
    public nome: string,
    public total_adultos: number,
    public moradia: MoradiaEnum,
    public problemas_saude_familia: string[],
    public despesas_saude: number | undefined,
    public perdas_catastrofes: PerdasCatastrofesEnum,
    public cesta_basica: boolean,
  ) {}

  static async fromRequest(request: NextRequest) {
    const data = await request.json();

    return new this(
      data.nome,
      data.total_adultos,
      data.moradia,
      data.problemas_saude_familia,
      data.despesas_saude,
      data.perdas_catastrofes,
      data.cesta_basica,
    );
  }
}

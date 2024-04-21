import { TiposAuxilios, TiposProblemas } from "@/database/models/Solicitacao";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { SolicitacaoAuxilioFormData } from "@/lib/ui/forms/solicitacao-auxilio/schema";
import { generateId } from "lucia";
import { NextRequest } from "next/server";

export class CreateSolicitacaoDTO {
  private constructor(
    public id: string,
    public usuario_id: string,
    public descriminador: TiposAuxilios,
    public tipo_problema: TiposProblemas,
    public descricao_problema: string,
    public numero_vagas_creches?: number,
    public numero_vagas_escolas?: number,
    public quantidade_cestas?: number,
    public vl_auxilio_medicamento?: number,
  ) {}

  static async fromFormData(data: SolicitacaoAuxilioFormData) {
    const { user } = await validateRequest();

    if (!user) {
      throw new ServerError("NO_AUTH", "Not a valid session!");
    }

    return new this(
      generateId(36),
      user.id,
      data.tipo_auxilio,
      data.tipo_problema,
      data.descricao_problema,
      data.qtd_vagas_creche,
      data.qtd_vagas_escola,
      data.qtd_cestas_basica,
      data.vl_auxilio_medicamento,
    );
  }

  static async fromRequest(request: NextRequest) {
    const { user } = await validateRequest();

    if (!user) {
      throw new ServerError("NO_AUTH", "Not a valid session!");
    }

    const data: SolicitacaoAuxilioFormData = await request.json();
    return await this.fromFormData(data);
  }
}

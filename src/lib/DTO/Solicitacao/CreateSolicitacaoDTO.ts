import { TiposAuxilios, TiposProblemas } from "@/database/models/Solicitacao";

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
  ) { }
}

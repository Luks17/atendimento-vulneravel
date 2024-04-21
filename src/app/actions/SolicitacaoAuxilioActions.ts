"use server";

import { SolicitacaoService } from "@/database/services/SolicitacaoService";
import { CreateSolicitacaoDTO } from "@/lib/DTO/Solicitacao/CreateSolicitacaoDTO";
import { mapAndTraceError } from "@/lib/error/util";
import { SolicitacaoAuxilioFormData } from "@/lib/ui/forms/solicitacao-auxilio/schema";

export async function submitSolicitacaoAuxilio(
  data: SolicitacaoAuxilioFormData,
) {
  try {
    const dto = await CreateSolicitacaoDTO.fromFormData(data);

    await SolicitacaoService.new(dto);

    return {
      success: true,
      data: {
        message: "Solicitacao Criada com Sucesso",
      },
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

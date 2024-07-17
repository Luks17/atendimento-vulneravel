"use server";

import { SolicitacaoService } from "@/database/services/SolicitacaoService";
import { CreateSolicitacaoDTO } from "@/lib/DTO/Solicitacao/CreateSolicitacaoDTO";
import Response, { SimpleReturn } from "@/lib/Response";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import { SolicitacaoAuxilioFormData } from "@/lib/ui/forms/solicitacao-auxilio/schema";

export async function list() {
  const { session, user } = await validateRequest();

  if (!session) {
    throw new ServerError(
      "NO_AUTH",
      "Unauthorized to list solicitacoes auxilio",
    );
  }

  try {
    return await SolicitacaoService.findAll({ usuario_id: user.id });
  } catch (e) {
    return mapAndTraceError(e);
  }
}

export async function submitSolicitacaoAuxilio(
  data: SolicitacaoAuxilioFormData,
): Promise<Response<SimpleReturn>> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError("NO_AUTH", "Unauthorized to create solicitacao");
    }

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

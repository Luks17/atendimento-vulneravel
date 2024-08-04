"use server";

import { SolicitacaoService } from "@/database/services/SolicitacaoService";
import { CreateSolicitacaoDTO } from "@/lib/DTO/Solicitacao/CreateSolicitacaoDTO";
import { UpdateSolicitacaoDTO } from "@/lib/DTO/Solicitacao/UpdateSolicitacaoDTO";
import type Response from "@/lib/Response";
import type { SimpleReturn } from "@/lib/Response";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import type { SolicitacaoAuxilioFormData } from "@/lib/ui/forms/solicitacao-auxilio/schema";

export async function list() {
  try {
    const { session, user } = await validateRequest();

    if (!session) {
      throw new ServerError(
        "NO_AUTH",
        "Unauthorized to list solicitacoes auxilio"
      );
    }

    return await SolicitacaoService.findAll({ usuario_id: user.id });
  } catch (e) {
    return mapAndTraceError(e);
  }
}

export async function submitSolicitacaoAuxilio(
  data: SolicitacaoAuxilioFormData
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

export async function updateSolicitacaoAuxilio(
  id: string,
  data: SolicitacaoAuxilioFormData
): Promise<Response<SimpleReturn>> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError("NO_AUTH", "Unauthorized to update solicitacao");
    }

    const dto = await UpdateSolicitacaoDTO.fromFormData(data);

    await SolicitacaoService.update({ id }, dto);

    return {
      success: true,
      data: {
        message: "Solicitacao Atualizada com Sucesso",
      },
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

export async function getSolicitacaoAuxilio(id: string) {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError("NO_AUTH", "Unauthorized to get solicitacao");
    }

    const solicitacao = await SolicitacaoService.findOne({ id });

    if (!solicitacao) {
      throw new ServerError("NOT_FOUND", "Solicitacao not found");
    }

    return {
      success: true,
      data: solicitacao,
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

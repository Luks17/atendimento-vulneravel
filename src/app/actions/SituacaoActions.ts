"use server";

import { Situacao } from "@/database/models/Situacao";
import { SituacaoService } from "@/database/services/SituacaoService";
import { UsuarioService } from "@/database/services/UsuarioService";
import { CreateSituacaoDTO } from "@/lib/DTO/Situacao/CreateSituacaoDTO";
import Response, { SimpleReturn } from "@/lib/Response";
import { RoutePermissions } from "@/lib/auth/Permissions";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import { RegistrarSituacaoFormData } from "@/lib/ui/forms/registrar-situacao/schema";

export async function submitSituacao(
  data: RegistrarSituacaoFormData,
): Promise<Response<SimpleReturn>> {
  try {
    const { session, user } = await validateRequest();

    if (!session) {
      throw new ServerError("NO_AUTH", "Unauthorized to create situacao");
    }

    const dto = CreateSituacaoDTO.fromFormData(data, user.id);

    await SituacaoService.new(dto);

    await UsuarioService.update(
      { id: user.id },
      { role: RoutePermissions.HAS_SITUACAO },
    );

    return {
      success: true,
      data: {
        message: "Situacao registrada com sucesso",
      },
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

export async function getSituacao(): Promise<
  Response<Situacao | SimpleReturn>
> {
  try {
    const { session, user } = await validateRequest();

    if (!session) {
      throw new ServerError("NO_AUTH", "Unauthorized to get situacao");
    }

    const situacao = await SituacaoService.findOne({ usuario_id: user.id });

    if (!situacao) {
      throw new ServerError("NOT_FOUND", "Situacao not found");
    }

    return {
      success: true,
      data: situacao,
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

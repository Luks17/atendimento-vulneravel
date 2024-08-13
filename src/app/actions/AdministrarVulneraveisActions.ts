"use server";

import type { Situacao } from "@/database/models/Situacao";
import { Solicitacao } from "@/database/models/Solicitacao";
import type { Usuario } from "@/database/models/Usuario";
import { SituacaoService } from "@/database/services/SituacaoService";
import { SolicitacaoService } from "@/database/services/SolicitacaoService";
import { UsuarioService } from "@/database/services/UsuarioService";
import { RoutePermissions } from "@/lib/auth/Permissions";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import type Response from "@/lib/Response";
import type { SimpleReturn } from "@/lib/Response";
import { Not } from "typeorm";

export async function list(): Promise<Response<Usuario[] | SimpleReturn>> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError("NO_AUTH", "Unauthorized to list vulneraveis");
    }

    const users = await UsuarioService.findAll({
      role: Not(RoutePermissions.IS_ADMIN + 1),
    });

    if (!users) throw new ServerError("NOT_FOUND", "Could not list users");

    return {
      success: true,
      data: users,
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

export async function getSituacao(
  id: string
): Promise<Response<Situacao | SimpleReturn>> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError(
        "NO_AUTH",
        "Unauthorized to view situacao of users"
      );
    }

    const situacao = await SituacaoService.findOne({ usuario_id: id });

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

export async function getSolicitacoes(
  id: string
): Promise<Response<Solicitacao[] | SimpleReturn>> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError(
        "NO_AUTH",
        "Unauthorized to view solicitacoes of users"
      );
    }

    const solicitacoes = await SolicitacaoService.findAll({ usuario_id: id });

    if (!solicitacoes) {
      throw new ServerError("NOT_FOUND", "Could not retrieve solicitacoes");
    }

    return {
      success: true,
      data: solicitacoes,
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

export async function getSolicitacao(id: string) {
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

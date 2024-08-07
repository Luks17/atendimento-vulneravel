"use server";

import { UsuarioService } from "@/database/services/UsuarioService";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import { LessThan } from "typeorm";

export async function list() {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError("NO_AUTH", "Unauthorized to list vulneraveis");
    }

    return await UsuarioService.findAll({ role: LessThan(3) });
  } catch (e) {
    return mapAndTraceError(e);
  }
}

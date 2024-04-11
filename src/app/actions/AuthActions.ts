"use server";

import { UsuarioService } from "@/database/services/UsuarioService";
import { CreateUsuarioDTO } from "@/lib/DTO/Usuario/CreateUsuarioDTO";
import { SignupFormData } from "@/lib/forms/auth/signupSchema";

export async function signup(data: SignupFormData) {
  const dto = await CreateUsuarioDTO.fromFormData(data);

  try {
    await UsuarioService.new(dto);
  } catch (e) {
    throw new Error("Internal Server Error");
  }
}

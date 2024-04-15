"use server";

import { UsuarioService } from "@/database/services/UsuarioService";
import { CreateUsuarioDTO } from "@/lib/DTO/Usuario/CreateUsuarioDTO";
import { lucia, validateRequest } from "@/lib/auth/Session";
import { LoginFormData } from "@/lib/forms/auth/loginSchema";
import { SignupFormData } from "@/lib/forms/auth/signupSchema";
import { argon2 } from "@/lib/crypt";
import { cookies } from "next/headers";

export async function signup(data: SignupFormData) {
  try {
    const dto = await CreateUsuarioDTO.fromFormData(data);

    await UsuarioService.new(dto);

    return {
      success: true,
      data: {
        message: "Conta criada com sucesso!",
      },
    };
  } catch (e: any) {
    return {
      success: false,
      data: {
        message: e.toString(),
      },
    };
  }
}

export async function login(data: LoginFormData) {
  try {
    const user = await UsuarioService.findOne({ email: data.email });

    if (!user) {
      throw new Error("Invalid user or password");
    }

    const doPasswordsMatch = await argon2.verify(user.passwd, data.passwd);

    if (!doPasswordsMatch) {
      throw new Error("Invalid user or password");
    }

    const session = await lucia.createSession(user.id, { nome: user.nome });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      data: {
        message: "Login feito com sucesso!",
      },
    };
  } catch (e: any) {
    return {
      success: false,
      data: {
        message: e.toString(),
      },
    };
  }
}

export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      success: false,
      data: {
        message: "Unauthorized",
      },
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return {
    success: true,
    data: {
      message: "Logged out successfully",
    },
  };
}

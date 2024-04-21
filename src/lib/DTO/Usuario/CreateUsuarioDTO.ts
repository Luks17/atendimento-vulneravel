import { argon2 } from "@/lib/crypt";
import { SignupFormData } from "@/lib/ui/forms/auth/signupSchema";
import { generateId } from "lucia";
import { NextRequest } from "next/server";

export class CreateUsuarioDTO {
  private constructor(
    public id: string,
    public email: string,
    public nome: string,
    public passwd: string,
  ) {}

  static async fromFormData(data: SignupFormData) {
    return new this(
      generateId(36),
      data.email,
      data.nome,
      await argon2.hash(data.passwd),
    );
  }

  static async fromRequest(request: NextRequest) {
    const data: SignupFormData = await request.json();
    return await this.fromFormData(data);
  }
}

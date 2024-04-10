import { SignupFormData } from "@/lib/forms/auth/signupSchema";
import { hash } from "@node-rs/argon2";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export class CreateUsuarioDTO {
  private constructor(
    public id: string,
    public email: string,
    public nome: string,
    public passwd: string,
  ) { }

  static async fromFormData(data: SignupFormData) {
    return new this(uuidv4(), data.email, data.nome, await hash(data.passwd));
  }

  static async fromRequest(request: NextRequest) {
    try {
      const data: SignupFormData = await request.json();
      return await this.fromFormData(data);
    } catch (e) {
      throw new Error("Invalid Request Body");
    }
  }
}

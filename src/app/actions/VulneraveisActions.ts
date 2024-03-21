"use server";

import { VulneravelService } from "@/database/services/VulneravelService";
import { CreateVulneravelDTO } from "@/lib/DTO/Vulneravel";
import { CadastrarVulneravelFormData } from "@/lib/forms/cadastrar-vulneravel/schema";

export async function list() {
  try {
    return await VulneravelService.getAll();
  } catch (e) {
    throw new Error("Internal Server Error");
  }
}

export async function submitVulneravel(data: CadastrarVulneravelFormData) {
  const dto = await CreateVulneravelDTO.fromFormData(data);

  try {
    await VulneravelService.new(dto);
  } catch (e) {
    throw new Error("Internal Server Error");
  }
}

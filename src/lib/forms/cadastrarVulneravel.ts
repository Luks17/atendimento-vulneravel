import { z } from "zod";

enum Moradia {
  "Casa Própria" = "casa_propria",
  "Aluguel" = "aluguel",
}

export const cadastrarVulneravelSchema = z.object({
  nome: z.string().min(1),
  total_adultos: z.coerce.number().min(1).int(),
  moradia: z.nativeEnum(Moradia),
});

export type CadastrarVulneravelFormData = z.infer<
  typeof cadastrarVulneravelSchema
>;

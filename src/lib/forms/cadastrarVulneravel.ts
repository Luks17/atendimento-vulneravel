import { z } from "zod";

export const cadastrarVulneravelSchema = z.object({
  nome: z.string().min(1),
  totalAdultos: z.coerce.number().min(1).int(),
  moradia: z.enum(["casa_própria", "aluguel"]),
});

export type CadastrarVulneravelFormData = z.infer<
  typeof cadastrarVulneravelSchema
>;

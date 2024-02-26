import { z } from "zod";

enum Moradia {
  "Casa Própria" = "casa_propria",
  "Aluguel" = "aluguel",
}

enum PerdasCatastrofes {
  "Nenhum" = "nenhum",
  "Incêndio" = "incendio",
  "Temporal" = "temporal",
  "Enchente" = "enchente",
}

export const cadastrarVulneravelSchema = z
  .object({
    nome: z.string().min(1),
    total_adultos: z.coerce.number().min(1).int(),
    moradia: z.nativeEnum(Moradia),
    problemas_saude_familia: z.string().array(),
    despesas_saude: z.coerce.number().optional(),
    perdas_catastrofes: z.nativeEnum(PerdasCatastrofes),
  })
  .refine((inputs) => {
    if (
      inputs.problemas_saude_familia.length > 0 &&
      inputs.despesas_saude === undefined
    ) {
      return false;
    }

    return true;
  });

export type CadastrarVulneravelFormData = z.infer<
  typeof cadastrarVulneravelSchema
>;

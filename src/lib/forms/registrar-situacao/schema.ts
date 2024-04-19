import { MoradiaEnum } from "@/database/models/Situacao";
import * as yup from "yup";
import { enumValues } from "../common";

export const registrarSituacaoSchema = yup.object({
  moradia: yup.mixed<MoradiaEnum>().oneOf(enumValues(MoradiaEnum)).required(),
  valor_aluguel: yup
    .number()
    .positive()
    .when("moradia", {
      is: (val: MoradiaEnum) => val === MoradiaEnum.Aluguel,
      then: (schema) => schema.required(),
    }),
  total_adultos: yup.number().positive().integer().required(),
  total_criancas: yup.number().positive().integer().required(),
  renda_familiar: yup.number().positive().required(),
});

export type RegistrarSituacaoFormData = yup.InferType<
  typeof registrarSituacaoSchema
>;

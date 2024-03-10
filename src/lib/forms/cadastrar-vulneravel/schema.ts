import * as yup from "yup";
import { enumValues } from "../common";
import {
  MoradiaEnum,
  PerdasCatastrofesEnum,
} from "@/database/models/Vulneravel";

export const cadastrarVulneravelSchema = yup.object({
  nome: yup.string().required(),
  total_adultos: yup.number().positive().integer().required(),
  moradia: yup.mixed<MoradiaEnum>().oneOf(enumValues(MoradiaEnum)).required(),
  problemas_saude_familia: yup.array().of(yup.string().required()).required(),
  despesas_saude: yup
    .number()
    .positive()
    .when("problemas_saude_familia", {
      is: (val: string[]) => val.length > 0,
      then: (schema) => schema.required(),
    }),
  perdas_catastrofes: yup
    .mixed<MoradiaEnum>()
    .oneOf(enumValues(PerdasCatastrofesEnum))
    .required(),
  cesta_basica: yup.boolean().required(),
});

export type CadastrarVulneravelFormData = yup.InferType<
  typeof cadastrarVulneravelSchema
>;

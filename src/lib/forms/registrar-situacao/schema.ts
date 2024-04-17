import { MoradiaEnum } from "@/database/models/Situacao";
import * as yup from "yup";
import { enumValues } from "../common";

export const registrarSituacaoSchema = yup.object({
  moradia: yup.mixed<MoradiaEnum>().oneOf(enumValues(MoradiaEnum)).required(),
  total_adultos: yup.number().positive().integer().required(),
});

export type RegistrarSituacaoFormData = yup.InferType<
  typeof registrarSituacaoSchema
>;

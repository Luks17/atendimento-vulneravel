import { TiposProblemas } from "@/database/models/Solicitacao";
import * as yup from "yup";
import { enumValues } from "../common";

export const solicitacaoAuxilioSchema = yup.object({
  tipo_problema: yup
    .mixed<TiposProblemas>()
    .oneOf(enumValues(TiposProblemas))
    .required(),
});

export type SolicitacaoAuxilioFormData = yup.InferType<
  typeof solicitacaoAuxilioSchema
>;

import * as yup from "yup";

export const solicitacaoAuxilioSchema = yup.object({});

export type SolicitacaoAuxilioFormData = yup.InferType<
  typeof solicitacaoAuxilioSchema
>;

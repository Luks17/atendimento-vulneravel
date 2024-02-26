import * as yup from "yup";
import { moradiaOptions, perdasCatastrofesOptions } from "./options";

const MoradiaValues = moradiaOptions.map(({ label: _, value }) => value);
const PerdasCatastrofesValues = perdasCatastrofesOptions.map(
  ({ label: _, value }) => value,
);

export const cadastrarVulneravelSchema = yup.object({
  nome: yup.string().required(),
  total_adultos: yup.number().positive().integer().required(),
  moradia: yup.string().oneOf(MoradiaValues).required(),
  problemas_saude_familia: yup.array().of(yup.string().required()).required(),
  despesas_saude: yup
    .number()
    .positive()
    .when("problemas_saude_familia", {
      is: (val: string[]) => val.length > 0,
      then: (schema) => schema.required(),
    }),
  perdas_catastrofes: yup.string().oneOf(PerdasCatastrofesValues).required(),
});

export type CadastrarVulneravelFormData = yup.InferType<
  typeof cadastrarVulneravelSchema
>;

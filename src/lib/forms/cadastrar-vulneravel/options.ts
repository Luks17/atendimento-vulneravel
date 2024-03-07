import { Option, extractValues } from "../common";

export const moradiaOptions: Option[] = [
  { label: "Casa Própria", value: "casa_propria" },
  { label: "Aluguel", value: "aluguel" },
];

export const perdasCatastrofesOptions: Option[] = [
  { label: "Nenhum", value: "nenhum" },
  { label: "Incêndio", value: "incendio" },
  { label: "Temporal", value: "temporal" },
  { label: "Enchente", value: "enchente" },
];

export const MoradiaValues = extractValues(moradiaOptions);
export const PerdasCatastrofesValues = extractValues(perdasCatastrofesOptions);

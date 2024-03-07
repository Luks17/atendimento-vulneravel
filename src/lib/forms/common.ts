export interface Option {
  label: string;
  value: string;
}

export const binaryOptions: Option[] = [
  { label: "Sim", value: "true" },
  { label: "Não", value: "false" },
];

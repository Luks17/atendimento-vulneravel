export interface Option {
  label: string;
  value: string;
}

export const binaryOptions: Option[] = [
  { label: "Sim", value: "true" },
  { label: "Não", value: "false" },
];

export const extractValues = (options: Option[]) =>
  options.map(({ label: _, value }) => value);

export interface Option {
  key: string;
  value: string;
}

export enum BinaryOptionsEnum {
  Sim = "true",
  Não = "false",
}

export const enumValues = <T>(e: Object): T[] => Object.values(e);
export const enumEntries = <T extends Record<string, string>>(e: T): Option[] =>
  Object.entries(e).map(([key, value]) => ({ key, value }));

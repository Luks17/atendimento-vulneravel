import type { Usuario } from "@/database/models/Usuario";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Usuario>();

export const columns: ColumnDef<Usuario, any>[] = [
  columnHelper.accessor("nome", { header: "Nome" }),
  columnHelper.accessor("cpf", { header: "CPF" }),
];

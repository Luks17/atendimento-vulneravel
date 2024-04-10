import {
  MoradiaEnum,
  PerdasCatastrofesEnum,
  Vulneravel,
} from "@/database/models/Vulneravel";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BinaryOptionsEnum, findKey } from "../forms/common";

const columnHelper = createColumnHelper<Vulneravel>();

export const columns: ColumnDef<Vulneravel, any>[] = [
  columnHelper.accessor("nome", {
    header: "Nome",
  }),
  columnHelper.accessor("total_adultos", {
    header: "Total de Adultos",
  }),
  columnHelper.accessor("moradia", {
    header: "Moradia",
    meta: { type: "enum", enum: MoradiaEnum },
    cell: (moradia) => findKey(MoradiaEnum, moradia.getValue()),
  }),
  columnHelper.accessor("tipos", {
    header: "Problemas de Saúde da Família",
    meta: { type: "array" },
    cell: ({ getValue, table, column }) =>
      getValue().length > 0 && (
        <button
          className="btn btn-secondary btn-xs btn-outline"
          onClick={(e) =>
            table.options.meta?.showModal(
              e,
              column.columnDef.header as string,
              getValue<string[]>(),
            )
          }
        >
          Visualizar
        </button>
      ),
    filterFn: (row, columnId, filterValue) =>
      !filterValue || row.getValue<string[]>(columnId).length > 0,
  }),
  columnHelper.accessor("perdas_catastrofes", {
    header: "Perdas por Catástrofe",
    meta: { type: "enum", enum: PerdasCatastrofesEnum },
    cell: (perda_catastrofe) =>
      findKey(PerdasCatastrofesEnum, perda_catastrofe.getValue()),
  }),
  columnHelper.accessor("cesta_basica", {
    header: "Solicitar Cesta Básica?",
    cell: (cesta_basica) =>
      findKey(BinaryOptionsEnum, cesta_basica.getValue().toString()),
  }),
];

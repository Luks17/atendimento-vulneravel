import {
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Column, Table } from "@tanstack/react-table";
import { ObjectLiteral } from "typeorm";
import DebouncedInput from "./DebouncedInput";
import { useMemo } from "react";

interface Props<T extends ObjectLiteral> {
  table: Table<T>;
  column: Column<T, any>;
}

function FilterDropdownContent<T extends ObjectLiteral>({
  table,
  column,
}: Props<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  return (
    <div className="z-10 dropdown-content bg-base-200 p-3 rounded-sm">
      <div className="flex items-center gap-x-1 ">
        <span className="text-base-content py-1 px-2">Organizar</span>
        {!column.getIsSorted() || column.getIsSorted() === "desc" ? (
          <button
            onClick={() => column.toggleSorting(false)}
            className="btn btn-xs"
          >
            <ArrowDownIcon className="w-3" />
          </button>
        ) : (
          <button
            onClick={() => column.toggleSorting(true)}
            className="btn btn-xs"
          >
            <ArrowUpIcon className="w-3" />
          </button>
        )}
        <button
          disabled={!column.getIsSorted()}
          onClick={() => column.clearSorting()}
          className="btn btn-xs"
        >
          <XMarkIcon className="w-3" />
        </button>
      </div>
      <div className="divider my-1"></div>
      <div className="flex flex-col gap-y-2 items-center">
        <span className="text-base-content">Filtrar</span>
        {typeof firstValue === "number" ? (
          <div className="flex gap-x-1">
            <DebouncedInput
              type="number"
              size={5}
              value={(columnFilterValue as [number, number])?.[0] ?? ""}
              placeholder="min"
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  value,
                  old?.[1],
                ])
              }
              className="input input-xs text-base-content form-control"
            />
            <DebouncedInput
              type="number"
              size={5}
              value={(columnFilterValue as [number, number])?.[1] ?? ""}
              placeholder="max"
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  value,
                ])
              }
              className="input input-xs text-base-content form-control"
            />
          </div>
        ) : (
          <>
            <datalist id={column.id + "list"}>
              {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                <option value={value} key={value} />
              ))}
            </datalist>
            <DebouncedInput
              type="text"
              size={10}
              value={(columnFilterValue ?? "") as string}
              onChange={(value) => column.setFilterValue(value)}
              placeholder="Pesquisar..."
              className="input input-xs text-base-content form-control"
              list={column.id + "list"}
            />
            <div className="h-1" />
          </>
        )}
      </div>
    </div>
  );
}

export default FilterDropdownContent;

"use client";

import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import { ObjectLiteral } from "typeorm";

interface Props<T extends ObjectLiteral> {
  initialData: T[];
  columns: ColumnDef<T, any>[];
}

function Table<T extends ObjectLiteral>({ initialData, columns }: Props<T>) {
  const modalContainer = useRef<HTMLDialogElement | null>(null);

  const [data, _] = useState(initialData);
  const [currentModalTitle, setCurrentModalTitle] = useState("");
  const [currentModalElements, setCurrentModalElements] = useState<any[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  function showModal(
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
    elements: any[],
  ) {
    e.preventDefault();

    setCurrentModalTitle(title);
    setCurrentModalElements(elements);

    modalContainer.current!.showModal();
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    meta: { showModal },
  });

  return (
    <>
      <div className="w-full py-12 bg-base-200 rounded-2xl form-control items-center">
        <div className="max-w-full max-md:px-2">
          <div className="overflow-x-auto rounded-sm">
            <table className="table table-zebra border-neutral border-b">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-secondary text-secondary-content"
                  >
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        <div className="dropdown">
                          <div
                            tabIndex={0}
                            className="cursor-pointer flex gap-x-1"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            <FunnelIcon className="w-3" />
                          </div>
                          <div className="z-10 dropdown-content flex items-center gap-x-1 bg-base-200 p-3 rounded-sm">
                            <span className="text-base-content py-1 px-2">
                              Organizar
                            </span>
                            {!header.column.getIsSorted() ||
                              header.column.getIsSorted() === "desc" ? (
                              <button
                                onClick={() =>
                                  header.column.toggleSorting(false)
                                }
                                className="btn btn-xs"
                              >
                                <ArrowDownIcon className="w-3" />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  header.column.toggleSorting(true)
                                }
                                className="btn btn-xs"
                              >
                                <ArrowUpIcon className="w-3" />
                              </button>
                            )}
                            <button
                              disabled={!header.column.getIsSorted()}
                              onClick={() => header.column.clearSorting()}
                              className="btn btn-xs"
                            >
                              <XMarkIcon className="w-3" />
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b-neutral bg-base-300">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="join mt-4">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            className="join-item btn"
          >
            <ChevronDoubleLeftIcon className="w-4" />
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="join-item btn"
          >
            <ChevronLeftIcon className="w-4" />
          </button>
          <button className="join-item btn">{`Página ${table.getState().pagination.pageIndex + 1}/${table.getPageCount()}`}</button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="join-item btn"
          >
            <ChevronRightIcon className="w-4" />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="join-item btn"
          >
            <ChevronDoubleRightIcon className="w-4" />
          </button>
        </div>
      </div>
      <dialog ref={modalContainer} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">{currentModalTitle}</h3>
          <ul className="flex flex-col gap-y-1">
            {currentModalElements.map((element, i) => {
              return (
                <li className="p-2" key={i}>
                  {i + 1 + ". " + element.tipo}
                </li>
              );
            })}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Table;

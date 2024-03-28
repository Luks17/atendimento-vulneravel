import "@tanstack/react-table";
import React from "react";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    showModal: (
      e: React.MouseEvent<HTMLButtonElement>,
      title: string,
      elements: string[],
    ) => void;
  }
}

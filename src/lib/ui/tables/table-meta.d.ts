import "@tanstack/react-table";
import React, { ReactNode } from "react";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    showModal: (
      e: React.MouseEvent<HTMLButtonElement>,
      title: string,
      element: ReactNode,
    ) => void;
  }

  interface ColumnMeta<T extends Record<string, string>> {
    type?: string;
    enum?: T;
  }
}

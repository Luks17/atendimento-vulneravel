"use client";

import Table from "@/app/(components)/dashboard/Table";
import type { Usuario } from "@/database/models/Usuario";
import { columns } from "@/lib/ui/tables/admin/vulneraveis";

interface Props {
  vulneraveisJSON: string;
}

function VulneraveisDataTable({ vulneraveisJSON }: Props) {
  const vulneraveis: Usuario[] = JSON.parse(vulneraveisJSON);

  return <Table initialData={vulneraveis} columns={columns} />;
}

export default VulneraveisDataTable;

"use client";

import Table from "@/app/ui/dashboard/Table";
import { Vulneravel } from "@/database/models/Vulneravel";
import { columns } from "@/lib/tables/vulneraveis";

function VulneravelDataTable({ vulneraveisJson }: { vulneraveisJson: string }) {
  const vulneraveis: Vulneravel[] = JSON.parse(vulneraveisJson);

  return <Table initialData={vulneraveis} columns={columns} />;
}

export default VulneravelDataTable;

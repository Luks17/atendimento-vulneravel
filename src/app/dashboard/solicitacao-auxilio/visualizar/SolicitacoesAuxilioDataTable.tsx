"use client";

import Table from "@/app/(components)/dashboard/Table";
import { Solicitacao } from "@/database/models/Solicitacao";
import { columns } from "@/lib/ui/tables/solicitacoesAuxilio";

function SolicitacoesAuxilioDataTable({
  solicitacoesAuxilioJson,
}: { solicitacoesAuxilioJson: string }) {
  const vulneraveis: Solicitacao[] = JSON.parse(solicitacoesAuxilioJson);

  return <Table initialData={vulneraveis} columns={columns} />;
}

export default SolicitacoesAuxilioDataTable;

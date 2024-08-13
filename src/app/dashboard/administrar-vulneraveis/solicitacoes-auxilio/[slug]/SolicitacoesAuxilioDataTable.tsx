"use client";

import Table from "@/app/(components)/dashboard/Table";
import type { Solicitacao } from "@/database/models/Solicitacao";
import { columns } from "@/lib/ui/tables/solicitacoesAuxilio";

function SolicitacoesAuxilioDataTable({
  solicitacoesAuxilioJson,
}: { solicitacoesAuxilioJson: string }) {
  const solicitacoesAuxilio: Solicitacao[] = JSON.parse(
    solicitacoesAuxilioJson
  );

  return <Table initialData={solicitacoesAuxilio} columns={columns} />;
}

export default SolicitacoesAuxilioDataTable;

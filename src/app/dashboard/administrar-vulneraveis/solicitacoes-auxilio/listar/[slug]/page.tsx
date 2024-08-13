import { getSolicitacoes } from "@/app/actions/AdministrarVulneraveisActions";
import SolicitacoesAuxilioDataTable from "./SolicitacoesAuxilioDataTable";
import type { Solicitacao } from "@/database/models/Solicitacao";

async function Page({ params }: { params: { slug: string } }) {
  const { success, data } = await getSolicitacoes(params.slug);

  if (success) {
    const solicitacoes = data as Solicitacao[];

    return (
      <SolicitacoesAuxilioDataTable
        solicitacoesAuxilioJson={JSON.stringify(solicitacoes)}
      />
    );
  }
}

export default Page;

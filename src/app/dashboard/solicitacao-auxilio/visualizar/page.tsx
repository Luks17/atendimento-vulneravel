import { list } from "@/app/actions/SolicitacaoAuxilioActions";
import SolicitacoesAuxilioDataTable from "./SolicitacoesAuxilioDataTable";

async function VisualizarSolicitacoesAuxilio() {
  const solicitacoesAuxilio = await list();

  return (
    <SolicitacoesAuxilioDataTable
      solicitacoesAuxilioJson={JSON.stringify(solicitacoesAuxilio)}
    />
  );
}

export default VisualizarSolicitacoesAuxilio;

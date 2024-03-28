import { list } from "@/app/actions/VulneraveisActions";
import VulneravelDataTable from "./VulneravelDataTable";

async function VisualizarVulneraveis() {
  const vulneraveis = await list();

  return <VulneravelDataTable vulneraveisJson={JSON.stringify(vulneraveis)} />;
}

export default VisualizarVulneraveis;

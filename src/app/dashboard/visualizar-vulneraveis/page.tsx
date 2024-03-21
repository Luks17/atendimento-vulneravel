import { list } from "@/app/actions/VulneraveisActions";
import Table from "./table";

async function VisualizarVulneraveis() {
  const vulneraveis = await list();

  return <Table vulneraveisJson={JSON.stringify(vulneraveis)} />;
}

export default VisualizarVulneraveis;

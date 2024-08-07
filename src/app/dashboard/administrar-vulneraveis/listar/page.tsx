import { list } from "@/app/actions/AdministrarVulneraveisActions";
import VulneraveisDataTable from "./VulneraveisDataTable";

async function AdministrarVulneraveis() {
  const vulneraveis = await list();

  return <VulneraveisDataTable vulneraveisJSON={JSON.stringify(vulneraveis)} />;
}

export default AdministrarVulneraveis;

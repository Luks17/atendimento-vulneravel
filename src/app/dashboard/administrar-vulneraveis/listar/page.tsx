import { list } from "@/app/actions/AdministrarVulneraveisActions";
import VulneraveisDataTable from "./VulneraveisDataTable";
import type { Usuario } from "@/database/models/Usuario";

async function AdministrarVulneraveis() {
  const { success, data } = await list();

  if (success) {
    const vulneraveis = data as Usuario[];
    return (
      <VulneraveisDataTable vulneraveisJSON={JSON.stringify(vulneraveis)} />
    );
  }
}

export default AdministrarVulneraveis;

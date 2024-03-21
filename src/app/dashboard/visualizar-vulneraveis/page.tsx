import { list } from "@/app/actions/VulneraveisActions";

async function VisualizarVulneraveis() {
  const vulneraveis = await list();

  return (
    <div className="w-full py-12 bg-base-200 rounded-2xl form-control items-center">
      <div className="max-w-full max-md:px-2">
        <div className="bg-neutral text-neutral-content overflow-x-auto shadow-sm rounded-lg">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center bg-primary text-primary-content">
                  Nome
                </th>
                <th className="text-center bg-primary text-primary-content">
                  Total de Adultos
                </th>
                <th className="text-center bg-primary text-primary-content">
                  Moradia
                </th>
                <th className="text-center bg-primary text-primary-content">
                  Problemas de Saúde da Família
                </th>
                <th className="text-center bg-primary text-primary-content">
                  Perdas por Catástrofe
                </th>
                <th className="text-center bg-primary text-primary-content">
                  Solicitar Cesta Básica?
                </th>
              </tr>
            </thead>
            <tbody>
              {vulneraveis.length > 0 ? (
                vulneraveis.map((vulneravel) => (
                  <tr key={vulneravel.id}>
                    <td className="text-center">{vulneravel.nome}</td>
                    <td className="text-center">{vulneravel.total_adultos}</td>
                    <td className="text-center">{vulneravel.moradia}</td>
                    <td className="text-center">
                      {vulneravel.tipos ? <button>Visualizar</button> : ""}
                    </td>
                    <td className="text-center">
                      {vulneravel.perdas_catastrofes}
                    </td>
                    <td className="text-center">{vulneravel.cesta_basica}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-10">Nenhum item registrado!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VisualizarVulneraveis;

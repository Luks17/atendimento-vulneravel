import ItemView from "@/app/(components)/dashboard/ItemView";
import { getSolicitacao } from "@/app/actions/AdministrarVulneraveisActions";
import type { Solicitacao } from "@/database/models/Solicitacao";
import { solicitacaoAuxilioFields } from "@/lib/ui/item-view/solicitacaoAuxilio";

async function Page({ params }: { params: { slug: string } }) {
  const { success, data } = await getSolicitacao(params.slug);

  if (success) {
    const solicitacao = data as Solicitacao;
    return (
      <ItemView
        title="Solicitação"
        fields={solicitacaoAuxilioFields}
        object={solicitacao}
      />
    );
  }
}

export default Page;

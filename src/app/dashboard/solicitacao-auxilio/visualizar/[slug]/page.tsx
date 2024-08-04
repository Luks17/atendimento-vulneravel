import ItemView from "@/app/(components)/dashboard/ItemView";
import { getSolicitacaoAuxilio } from "@/app/actions/SolicitacaoAuxilioActions";
import type { Solicitacao } from "@/database/models/Solicitacao";
import { solicitacaoAuxilioFields } from "@/lib/ui/item-view/solicitacaoAuxilio";

async function Page({ params }: { params: { slug: string } }) {
  const { success, data } = await getSolicitacaoAuxilio(params.slug);

  if (success) {
    const solicitacao = data as Solicitacao;
    return (
      <ItemView
        title="Solicitação"
        fields={solicitacaoAuxilioFields}
        object={solicitacao}
        edit_url={`/dashboard/solicitacao-auxilio/editar/${params.slug}`}
      />
    );
  }
}

export default Page;

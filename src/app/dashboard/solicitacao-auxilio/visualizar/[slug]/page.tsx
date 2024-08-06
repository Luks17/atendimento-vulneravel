import ItemView from "@/app/(components)/dashboard/ItemView";
import {
  deleteSolicitacaoAuxilio,
  getSolicitacaoAuxilio,
} from "@/app/actions/SolicitacaoAuxilioActions";
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
        editUrl={`/dashboard/solicitacao-auxilio/editar/${params.slug}`}
        deleteHandler={deleteSolicitacaoAuxilio}
      />
    );
  }
}

export default Page;

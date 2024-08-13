import ItemView from "@/app/(components)/dashboard/ItemView";
import { getSituacao } from "@/app/actions/AdministrarVulneraveisActions";
import type { Situacao } from "@/database/models/Situacao";
import { SituacaoFields } from "@/lib/ui/item-view/situacao";

async function Page({ params }: { params: { slug: string } }) {
  const { success, data } = await getSituacao(params.slug);

  if (success) {
    const situacao = data as Situacao;
    return (
      <ItemView title="Situação" fields={SituacaoFields} object={situacao} />
    );
  }
}

export default Page;

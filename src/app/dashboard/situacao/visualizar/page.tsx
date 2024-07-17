import ItemView from "@/app/(components)/dashboard/ItemView";
import { getSituacao } from "@/app/actions/SituacaoActions";
import { Situacao } from "@/database/models/Situacao";
import { SituacaoFields } from "@/lib/ui/item-view/situacao";

async function Page() {
  const { success, data } = await getSituacao();

  if (success) {
    const situacao = data as Situacao;
    return (
      <ItemView
        title="Sua situação"
        fields={SituacaoFields}
        object={situacao}
        edit_url="/dashboard/situacao/editar"
      />
    );
  }
}

export default Page;

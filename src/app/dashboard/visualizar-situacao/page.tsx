import ItemView from "@/app/(components)/dashboard/ItemView";
import { getSituacao } from "@/app/actions/SituacaoActions";
import { Situacao } from "@/database/models/Situacao";
import { SituacaoFields } from "@/lib/ui/item-view/situacao";
import Link from "next/link";

async function Page() {
  const { success, data } = await getSituacao();

  if (success) {
    const situacao = data as Situacao;
    return (
      <div>
        <div className="flex justify-end gap-x-3 p-3">
          <Link className="btn btn-secondary" href="/dashboard/editar-situacao">
            Editar
          </Link>
          <button className="btn btn-error">Excluir</button>
        </div>
        <ItemView
          title="Sua situação"
          fields={SituacaoFields}
          object={situacao}
        />
      </div>
    );
  }
}

export default Page;

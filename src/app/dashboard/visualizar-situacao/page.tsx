import { getSituacao } from "@/app/actions/SituacaoActions";
import { Situacao } from "@/database/models/Situacao";

async function Page() {
  const { success, data } = await getSituacao();

  if (success) {
    const situacao = data as Situacao;
    return (
      <div className="w-full h-full bg-base-200 rounded-box flex items-center">
        <ul>
          <li>{situacao.moradia}</li>
        </ul>
      </div>
    );
  }
}

export default Page;

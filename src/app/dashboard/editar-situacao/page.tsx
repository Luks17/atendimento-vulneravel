import { getSituacao } from "@/app/actions/SituacaoActions";
import { Situacao } from "@/database/models/Situacao";

async function Page() {
  const { success, data } = await getSituacao();

  if (success) {
    const situacao = data as Situacao;
  }
}

export default Page;

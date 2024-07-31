import { getSolicitacaoAuxilio } from "@/app/actions/SolicitacaoAuxilioActions";
import SolicitacaoForm from "../../SolicitacaoForm";

async function Page({ params }: { params: { slug: string } }) {
  const { success, data } = await getSolicitacaoAuxilio(params.slug);
  if (success) {
    return <SolicitacaoForm solicitacaoJSON={JSON.stringify(data)} />;
  }
}

export default Page;

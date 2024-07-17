import { getSituacao } from "@/app/actions/SituacaoActions";
import { Situacao } from "@/database/models/Situacao";
import SituacaoForm from "../SituacaoForm";

async function Page() {
	const { success, data } = await getSituacao();

	if (success) {
		const situacao = data as Situacao;

		return <SituacaoForm situacaoJSON={JSON.stringify(situacao)} />;
	}
}

export default Page;

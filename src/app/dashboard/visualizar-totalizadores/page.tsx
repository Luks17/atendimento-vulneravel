import {
  getLastMonthsUsersCount,
  getSolicitacoesStatusCounts,
} from "@/app/actions/TotalizadoresActions";
import Totalizers from "./totalizers";

async function Page() {
  const { data: usersCount } = await getLastMonthsUsersCount();
  const { data: solicitacoesStatus } = await getSolicitacoesStatusCounts();

  return (
    <Totalizers
      dataJSON={JSON.stringify({
        content: [
          {
            chartDesc: "Usuários registrados nos últimos meses",
            chartType: "line",
            ...usersCount,
          },
          {
            chartDesc: "Estados das solicitações",
            chartType: "pizza",
            ...solicitacoesStatus,
          },
        ],
      })}
    />
  );
}

export default Page;

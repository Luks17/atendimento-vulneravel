import { SolicitacaoService } from "@/database/services/SolicitacaoService";
import { UsuarioService } from "@/database/services/UsuarioService";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import type Response from "@/lib/Response";
import type { SimpleReturn } from "@/lib/Response";
import type { ChartProps } from "@/lib/ui/charts/Chart";

export async function getLastMonthsUsersCount(): Promise<
  Response<ChartProps | SimpleReturn>
> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError(
        "NO_AUTH",
        "Unauthorized to fetch last months users count"
      );
    }

    const data = await UsuarioService.fetchLastMonthsCount();

    return {
      success: true,
      data,
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

export async function getSolicitacoesStatusCounts(): Promise<
  Response<ChartProps | SimpleReturn>
> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError(
        "NO_AUTH",
        "Unauthorized to fetch last months users count"
      );
    }

    const data = await SolicitacaoService.fetchStatusCount();

    return {
      success: true,
      data,
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

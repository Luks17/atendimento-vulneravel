import { UsuarioService } from "@/database/services/UsuarioService";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import type Response from "@/lib/Response";
import type { SimpleReturn } from "@/lib/Response";
import type { LineChartProps } from "@/lib/ui/charts/LineChart";

export async function getLastMonthsUsersCount(): Promise<
  Response<LineChartProps | SimpleReturn>
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

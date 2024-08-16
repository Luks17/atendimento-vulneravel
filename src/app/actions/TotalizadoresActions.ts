import { UsuarioService } from "@/database/services/UsuarioService";
import { validateRequest } from "@/lib/auth/Session";
import { ServerError } from "@/lib/error/ServerError";
import { mapAndTraceError } from "@/lib/error/util";
import type Response from "@/lib/Response";

export async function getLastMonthsUsersCount(): Promise<Response<any>> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new ServerError(
        "NO_AUTH",
        "Unauthorized to fetch last months users count"
      );
    }

    const result = await UsuarioService.fetchLastMonthsCount();
    const formattedData = [
      {
        id: "months",
        color: "hsl(264, 70%, 50%)",
        data: result,
      },
    ];

    return {
      success: true,
      data: formattedData,
    };
  } catch (e) {
    return mapAndTraceError(e);
  }
}

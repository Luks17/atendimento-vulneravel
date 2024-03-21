import { VulneravelService } from "@/database/services/VulneravelService";
import { CreateVulneravelDTO } from "@/lib/DTO/Vulneravel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const dto = await CreateVulneravelDTO.fromRequest(req);
    const entity = await VulneravelService.new(dto);

    return new NextResponse(JSON.stringify(entity), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: e }), {
      status: 400,
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "./lib/auth/Session";

export async function middleware(request: NextRequest) {
  // const { session } = await validateRequest();
  //
  // if (!session && !request.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
}

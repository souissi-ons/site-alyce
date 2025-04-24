"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const isLoginUrl =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";

  if (token && isLoginUrl) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

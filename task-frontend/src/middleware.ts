import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("at")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth/");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};

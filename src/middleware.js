import { NextResponse, userAgent } from "next/server";

const protectedRoutes = ["/code", "/data"];

export function middleware(request) {
  const hasTicket = request?.cookies.has("ticket");

  // redirect user form login to data page when has cookie(authenticated)
  if (request.nextUrl.pathname === "/") {
    if (hasTicket) {
      return NextResponse.redirect(new URL("/data", request.url));
    }
  }

  // redirect user form data and code page to login when hasn't cookie(not authenticated)
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!hasTicket) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

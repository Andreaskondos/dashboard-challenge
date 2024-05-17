import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./lib/actions";

const AUTH_ROUTES = ["/settings"];

const ADMIN_ROUTES = ["/users", "/createUser"];

const GUEST_ROUTES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentUser = await getCurrentUser();

  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  if (GUEST_ROUTES.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/settings", request.url));
  }

  if (AUTH_ROUTES.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (ADMIN_ROUTES.includes(pathname) && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return null;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

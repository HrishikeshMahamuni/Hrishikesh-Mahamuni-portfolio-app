import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If attempting to access any admin page except the login root page
  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    if (!token) {
      // Redirect to admin login screen
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // If attempting to access the admin login page itself but already authenticated
  if (pathname === "/admin") {
    if (token) {
      // Redirect straight to dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

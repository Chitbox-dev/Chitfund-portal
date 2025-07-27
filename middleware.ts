import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and specific paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/access-request") ||
    pathname.startsWith("/access-denied") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/foreman") ||
    pathname.startsWith("/user")
  ) {
    return NextResponse.next()
  }

  // For root path, check admin access
  if (pathname === "/") {
    const adminAccess = request.cookies.get("admin_access")
    const userType = request.cookies.get("user_type")

    // Only allow admin access to landing page
    if (!adminAccess || adminAccess.value !== "true" || !userType || userType.value !== "admin") {
      return NextResponse.redirect(new URL("/access-request", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

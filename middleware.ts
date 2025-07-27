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
    pathname.startsWith("/access-denied")
  ) {
    return NextResponse.next()
  }

  // Check for access cookies
  const adminAccess = request.cookies.get("admin_access")
  const portalAccess = request.cookies.get("portal_access")
  const userType = request.cookies.get("user_type")

  // If no access at all, redirect to access request
  if ((!adminAccess || adminAccess.value !== "true") && (!portalAccess || portalAccess.value !== "true")) {
    return NextResponse.redirect(new URL("/access-request", request.url))
  }

  // Check role-based access for specific paths
  if (pathname.startsWith("/admin")) {
    if (!adminAccess || adminAccess.value !== "true" || !userType || userType.value !== "admin") {
      return NextResponse.redirect(new URL("/access-denied", request.url))
    }
  }

  if (pathname.startsWith("/foreman")) {
    if (!userType || userType.value !== "foreman") {
      return NextResponse.redirect(new URL("/access-denied", request.url))
    }
  }

  if (pathname.startsWith("/user")) {
    if (!userType || userType.value !== "user") {
      return NextResponse.redirect(new URL("/access-denied", request.url))
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

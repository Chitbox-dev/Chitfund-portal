import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and admin routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") ||
    pathname.startsWith("/access-request") ||
    pathname.startsWith("/access-denied")
  ) {
    return NextResponse.next()
  }

  // Check for access approval cookie
  const accessApproved = request.cookies.get("chit_fund_access_approved")
  const userType = request.cookies.get("chit_fund_user_type")

  // If accessing root path without approval, redirect to access request
  if (pathname === "/" && !accessApproved) {
    return NextResponse.redirect(new URL("/access-request", request.url))
  }

  // If user has approval but no user type, redirect to access request
  if (pathname === "/" && accessApproved && !userType) {
    return NextResponse.redirect(new URL("/access-request", request.url))
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

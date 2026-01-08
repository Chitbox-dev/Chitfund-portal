import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Admin IP whitelist (add trusted IPs here)
const ADMIN_IP_WHITELIST = process.env.ADMIN_IP_WHITELIST?.split(",") || []

// Suspicious activity log
const activityLog = new Map<string, { attempts: number; lastAttempt: number; blocked: boolean }>()

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const real = request.headers.get("x-real-ip")
  return forwarded?.split(",")[0] || real || "unknown"
}

function checkRateLimit(identifier: string, limit = 100, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

function logSuspiciousActivity(ip: string, path: string, reason: string) {
  console.log("[SECURITY ALERT]", {
    timestamp: new Date().toISOString(),
    ip,
    path,
    reason,
  })

  const activity = activityLog.get(ip) || { attempts: 0, lastAttempt: 0, blocked: false }
  activity.attempts++
  activity.lastAttempt = Date.now()

  // Block IP after 10 suspicious attempts
  if (activity.attempts >= 10) {
    activity.blocked = true
  }

  activityLog.set(ip, activity)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIP(request)

  // Check if IP is blocked
  const activity = activityLog.get(ip)
  if (activity?.blocked) {
    logSuspiciousActivity(ip, pathname, "Blocked IP attempting access")
    return NextResponse.json({ error: "Access denied" }, { status: 403 })
  }

  // Rate limiting - 100 requests per minute per IP
  if (!checkRateLimit(ip, 100, 60000)) {
    logSuspiciousActivity(ip, pathname, "Rate limit exceeded")
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Check IP whitelist for admin access (if configured)
    if (ADMIN_IP_WHITELIST.length > 0 && !ADMIN_IP_WHITELIST.includes(ip)) {
      logSuspiciousActivity(ip, pathname, "Unauthorized admin access attempt")
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // Check for admin token (server-side validation)
    const adminToken = request.cookies.get("adminToken")?.value
    if (!adminToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Protect foreman routes
  if (pathname.startsWith("/foreman")) {
    const foremanToken = request.cookies.get("foremanToken")?.value
    if (!foremanToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Protect user routes
  if (pathname.startsWith("/user")) {
    const userToken = request.cookies.get("userToken")?.value
    if (!userToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Protect API routes
  if (pathname.startsWith("/api")) {
    // Stricter rate limiting for API routes - 50 requests per minute
    if (!checkRateLimit(`${ip}-api`, 50, 60000)) {
      logSuspiciousActivity(ip, pathname, "API rate limit exceeded")
      return NextResponse.json({ error: "Too many API requests" }, { status: 429 })
    }

    // Log all API requests
    console.log("[API REQUEST]", {
      timestamp: new Date().toISOString(),
      ip,
      path: pathname,
      method: request.method,
    })
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

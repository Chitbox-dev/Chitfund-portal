import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth/jwt"
import { activityMonitor } from "@/lib/security/activity-monitor"

export async function POST(request: NextRequest) {
  try {
    const { token, role } = await request.json()

    if (!token || !role) {
      return NextResponse.json({ success: false, error: "Missing token or role" }, { status: 400 })
    }

    const payload = await verifyToken(token)

    if (!payload || payload.role !== role) {
      activityMonitor.log({
        ip: request.headers.get("x-forwarded-for") || "unknown",
        action: "invalid_token_verification",
        path: "/api/auth/verify",
        severity: "medium",
        details: { role },
      })

      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        userId: payload.userId,
        role: payload.role,
        ucfsin: payload.ucfsin,
        email: payload.email,
      },
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 })
  }
}

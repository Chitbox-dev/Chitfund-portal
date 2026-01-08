import { type NextRequest, NextResponse } from "next/server"
import { activityMonitor } from "@/lib/security/activity-monitor"
import { verifyToken } from "@/lib/auth/jwt"

export async function GET(request: NextRequest) {
  try {
    // Only admins can view activity logs
    const token = request.cookies.get("adminToken")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const severity = searchParams.get("severity") || undefined
    const ip = searchParams.get("ip") || undefined

    const events = activityMonitor.getEvents({ severity, ip })

    return NextResponse.json({
      success: true,
      events: events.slice(-100), // Return last 100 events
      total: events.length,
    })
  } catch (error) {
    console.error("Activity log error:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

interface AccessRequestData {
  requestType: "company" | "user" | "foreman"
  companyName?: string
  contactPerson: string
  email: string
  phone: string
  purpose: string
  businessType?: string
  experience?: string
  mcqScore?: number
  mcqAnswers?: { [key: string]: string }
}

export async function POST(request: NextRequest) {
  try {
    const data: AccessRequestData = await request.json()

    // Validate required fields
    if (!data.requestType || !data.contactPerson || !data.email || !data.phone || !data.purpose) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Generate request ID
    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create access request object
    const accessRequest = {
      id: requestId,
      ...data,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // Determine if request should be auto-approved
    const shouldAutoApprove =
      data.requestType === "company" || (data.mcqScore && data.mcqScore >= (data.requestType === "foreman" ? 80 : 70))

    if (shouldAutoApprove) {
      // Set access cookies for approved users
      const cookieStore = await cookies()
      const maxAge = 60 * 60 * 24 * 30 // 30 days

      const cookieOptions = {
        path: "/",
        maxAge,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
      }

      cookieStore.set("access_approved", "true", cookieOptions)
      cookieStore.set("user_type", data.requestType, cookieOptions)
      cookieStore.set("user_email", data.email, cookieOptions)
      cookieStore.set("request_id", requestId, cookieOptions)

      // Update request status
      accessRequest.status = "approved"
    }

    // In a real application, you would save this to a database
    // For demo purposes, we'll just return the response

    return NextResponse.json({
      success: true,
      requestId,
      approved: shouldAutoApprove,
      message: shouldAutoApprove
        ? "Access approved! You can now access the landing page."
        : "Request submitted for admin review.",
      data: accessRequest,
    })
  } catch (error) {
    console.error("Error processing access request:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check current access status
    const cookieStore = await cookies()
    const accessApproved = cookieStore.get("access_approved")?.value === "true"
    const userType = cookieStore.get("user_type")?.value
    const userEmail = cookieStore.get("user_email")?.value
    const requestId = cookieStore.get("request_id")?.value

    return NextResponse.json({
      hasAccess: accessApproved,
      userType,
      userEmail,
      requestId,
    })
  } catch (error) {
    console.error("Error checking access status:", error)
    return NextResponse.json({ hasAccess: false, error: "Failed to check access status" }, { status: 500 })
  }
}

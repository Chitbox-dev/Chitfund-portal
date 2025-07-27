"use server"

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

export async function submitAccessRequest(data: AccessRequestData) {
  try {
    // Generate request ID
    const requestId = `REQ-${Date.now()}`

    // Create request object
    const accessRequest = {
      id: requestId,
      ...data,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // Auto-approve logic for demo
    const shouldAutoApprove =
      data.requestType === "company" || (data.mcqScore && data.mcqScore >= (data.requestType === "foreman" ? 80 : 70))

    if (shouldAutoApprove) {
      // Set cookies for approved access
      const cookieStore = await cookies()
      const maxAge = 60 * 60 * 24 * 30 // 30 days

      cookieStore.set("access_approved", "true", {
        path: "/",
        maxAge,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      cookieStore.set("user_type", data.requestType, {
        path: "/",
        maxAge,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      cookieStore.set("user_email", data.email, {
        path: "/",
        maxAge,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      cookieStore.set("request_id", requestId, {
        path: "/",
        maxAge,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      return {
        success: true,
        requestId,
        approved: true,
        message: "Access approved! You can now access the landing page.",
      }
    }

    return {
      success: true,
      requestId,
      approved: false,
      message: "Request submitted for admin review.",
    }
  } catch (error) {
    console.error("Error processing access request:", error)
    return {
      success: false,
      error: "Failed to process access request",
    }
  }
}

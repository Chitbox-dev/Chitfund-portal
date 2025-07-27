"use server"

export interface AccessRequestData {
  userType: "admin" | "company" | "user" | "foreman"
  email: string
  password?: string
  companyName?: string
  businessType?: string
  integrationNeeds?: string[]
  fullName?: string
  phone?: string
  experience?: string
  chitFundKnowledge?: number
  foremanExperience?: string
  managementSkills?: number
}

export async function submitAccessRequest(data: AccessRequestData) {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (data.userType === "admin") {
      // Validate admin credentials
      const validEmail = "admin@chitfundportal.com"
      const validPassword = "Admin@123"

      if (data.email !== validEmail || data.password !== validPassword) {
        return {
          success: false,
          message: "Invalid admin credentials. Please check your email and password.",
        }
      }

      // Set admin access cookies
      const response = new Response()
      response.headers.set(
        "Set-Cookie",
        `admin_access=true; user_type=admin; user_email=${encodeURIComponent(data.email)}; Path=/; Max-Age=${30 * 24 * 60 * 60}`,
      )

      return {
        success: true,
        message: "Admin access granted successfully!",
        redirectTo: "/",
      }
    } else {
      // For other user types, simulate approval process
      // In a real app, this would save to database and notify admin
      console.log("Access request submitted:", data)

      return {
        success: true,
        message: `Access request submitted successfully! Admin will review your ${data.userType} access request and notify you via email.`,
        redirectTo: "/access-request",
      }
    }
  } catch (error) {
    console.error("Error submitting access request:", error)
    return {
      success: false,
      message: "An error occurred while submitting your request. Please try again.",
    }
  }
}

export async function approveAccessRequest(requestId: string, userType: string, email: string) {
  try {
    // Simulate approval process
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real app, this would update the database and send notification email
    console.log(`Approved access request ${requestId} for ${userType}: ${email}`)

    return {
      success: true,
      message: "Access request approved successfully!",
    }
  } catch (error) {
    console.error("Error approving access request:", error)
    return {
      success: false,
      message: "An error occurred while approving the request.",
    }
  }
}

export interface AccessRequest {
  id: string
  requestType: "admin" | "company" | "user" | "foreman"
  companyName?: string
  contactPerson: string
  email: string
  phone: string
  password?: string
  purpose: string
  businessType?: string
  userType?: string
  experience?: string
  mcqAnswers?: { [key: string]: string }
  mcqScore?: number
  status: "pending" | "mcq_required" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  adminComments?: string
}

export const checkUserAccess = (): {
  hasAccess: boolean
  userType: string | null
  email: string | null
} => {
  if (typeof window === "undefined") {
    return { hasAccess: false, userType: null, email: null }
  }

  const adminAccess = document.cookie.includes("admin_access=true")
  const portalAccess = document.cookie.includes("portal_access=true")

  if (!adminAccess && !portalAccess) {
    return { hasAccess: false, userType: null, email: null }
  }

  const userTypeCookie = document.cookie.split("; ").find((row) => row.startsWith("user_type="))
  const emailCookie = document.cookie.split("; ").find((row) => row.startsWith("user_email="))

  const userType = userTypeCookie ? userTypeCookie.split("=")[1] : null
  const email = emailCookie ? decodeURIComponent(emailCookie.split("=")[1]) : null

  return {
    hasAccess: true,
    userType,
    email,
  }
}

export const getUserToken = (userType: string): string | null => {
  if (typeof window === "undefined") return null

  switch (userType) {
    case "admin":
      return localStorage.getItem("adminToken")
    case "user":
      return localStorage.getItem("userToken")
    case "foreman":
      return localStorage.getItem("foremanToken")
    case "company":
      return localStorage.getItem("companyToken")
    default:
      return null
  }
}

export const clearUserAccess = (): void => {
  if (typeof window === "undefined") return

  // Clear cookies
  document.cookie = "admin_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  document.cookie = "portal_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  document.cookie = "user_type=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  document.cookie = "user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  document.cookie = "request_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

  // Clear localStorage
  localStorage.removeItem("adminToken")
  localStorage.removeItem("userToken")
  localStorage.removeItem("foremanToken")
  localStorage.removeItem("companyToken")
}

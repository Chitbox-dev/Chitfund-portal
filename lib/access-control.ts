export interface AccessUser {
  email: string
  userType: "company" | "user" | "foreman"
  requestId: string
  approvedAt: string
}

export function checkAccessApproval(): AccessUser | null {
  if (typeof window === "undefined") return null

  const cookies = document.cookie.split(";")
  const accessCookie = cookies.find((cookie) => cookie.trim().startsWith("access_approved="))
  const userTypeCookie = cookies.find((cookie) => cookie.trim().startsWith("user_type="))
  const emailCookie = cookies.find((cookie) => cookie.trim().startsWith("user_email="))
  const requestIdCookie = cookies.find((cookie) => cookie.trim().startsWith("request_id="))

  if (accessCookie && accessCookie.includes("true") && userTypeCookie && emailCookie && requestIdCookie) {
    return {
      email: decodeURIComponent(emailCookie.split("=")[1]),
      userType: userTypeCookie.split("=")[1] as "company" | "user" | "foreman",
      requestId: requestIdCookie.split("=")[1],
      approvedAt: new Date().toISOString(),
    }
  }

  return null
}

export function setAccessApproval(user: Omit<AccessUser, "approvedAt">) {
  const maxAge = 60 * 60 * 24 * 30 // 30 days for landing page access
  const expires = new Date(Date.now() + maxAge * 1000).toUTCString()

  document.cookie = `access_approved=true; path=/; expires=${expires}; SameSite=Lax`
  document.cookie = `user_type=${user.userType}; path=/; expires=${expires}; SameSite=Lax`
  document.cookie = `user_email=${encodeURIComponent(user.email)}; path=/; expires=${expires}; SameSite=Lax`
  document.cookie = `request_id=${user.requestId}; path=/; expires=${expires}; SameSite=Lax`
}

export function hasValidAccess(): boolean {
  return checkAccessApproval() !== null
}

export function getUserType(): string | null {
  const user = checkAccessApproval()
  return user ? user.userType : null
}

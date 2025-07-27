export interface AccessUser {
  userType: "admin" | "company" | "user" | "foreman"
  email: string
  accessLevel: "full" | "limited"
  approvedAt: string
}

export function checkAccessApproval(): AccessUser | null {
  if (typeof window === "undefined") return null

  try {
    const cookies = document.cookie.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=")
        acc[key] = value
        return acc
      },
      {} as Record<string, string>,
    )

    const userType = cookies.user_type as AccessUser["userType"]
    const email = cookies.user_email
    const hasAccess = cookies.admin_access === "true" || cookies.portal_access === "true"

    if (!hasAccess || !userType || !email) {
      return null
    }

    return {
      userType,
      email: decodeURIComponent(email),
      accessLevel: cookies.admin_access === "true" ? "full" : "limited",
      approvedAt: cookies.approved_at || new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error checking access approval:", error)
    return null
  }
}

export function setAccessApproval(user: AccessUser): void {
  if (typeof window === "undefined") return

  const expires = new Date()
  expires.setDate(expires.getDate() + 30) // 30 days

  document.cookie = `user_type=${user.userType}; expires=${expires.toUTCString()}; path=/`
  document.cookie = `user_email=${encodeURIComponent(user.email)}; expires=${expires.toUTCString()}; path=/`
  document.cookie = `${user.accessLevel === "full" ? "admin_access" : "portal_access"}=true; expires=${expires.toUTCString()}; path=/`
  document.cookie = `approved_at=${user.approvedAt}; expires=${expires.toUTCString()}; path=/`
}

export function clearAccessApproval(): void {
  if (typeof window === "undefined") return

  const cookies = ["user_type", "user_email", "admin_access", "portal_access", "approved_at"]
  cookies.forEach((cookie) => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  })
}

export function validateAdminCredentials(email: string, password: string): boolean {
  // In a real application, this would validate against a secure backend
  const validCredentials = {
    email: "admin@chitfundportal.com",
    password: "Admin@123",
  }

  return email === validCredentials.email && password === validCredentials.password
}

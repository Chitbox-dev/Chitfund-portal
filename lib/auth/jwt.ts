import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface JWTPayload {
  userId: string
  role: "admin" | "foreman" | "user"
  ucfsin?: string
  email?: string
  exp?: number
}

export async function createToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export function setAuthCookie(response: Response, token: string, role: string): void {
  const cookieName = `${role}Token`
  const cookie = `${cookieName}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`

  response.headers.append("Set-Cookie", cookie)
}

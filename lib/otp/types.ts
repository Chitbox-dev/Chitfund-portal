export interface OTPProvider {
  sendOTP(phoneNumber: string, message?: string, channel?: "sms" | "whatsapp"): Promise<OTPResponse>
  verifyOTP?(phoneNumber: string, otp: string): Promise<boolean>
}

export interface OTPResponse {
  success: boolean
  messageId?: string
  error?: string
}

export interface OTPConfig {
  provider: "twilio" | "aws-sns" | "firebase" // Extensible for future providers
  credentials: Record<string, string>
}

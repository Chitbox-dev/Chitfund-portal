import type { OTPProvider, OTPConfig } from "./types"
import { TwilioOTPProvider } from "./twilio-provider"

export class OTPService {
  private provider: OTPProvider

  constructor(config?: OTPConfig) {
    const providerType = config?.provider || process.env.OTP_PROVIDER || "twilio"

    switch (providerType) {
      case "twilio":
        this.provider = new TwilioOTPProvider()
        break
      // Future providers can be added here
      // case 'aws-sns':
      //   this.provider = new AWSSNSOTPProvider()
      //   break
      // case 'firebase':
      //   this.provider = new FirebaseOTPProvider()
      //   break
      default:
        throw new Error(`Unsupported OTP provider: ${providerType}`)
    }
  }

  async sendOTP(phoneNumber: string, message?: string, channel: "sms" | "whatsapp" = "whatsapp") {
    return this.provider.sendOTP(phoneNumber, message, channel)
  }

  async verifyOTP(phoneNumber: string, otp: string) {
    if (this.provider.verifyOTP) {
      return this.provider.verifyOTP(phoneNumber, otp)
    }
    throw new Error("OTP verification not supported by this provider")
  }
}

// Singleton instance
let otpServiceInstance: OTPService | null = null

export function getOTPService(): OTPService {
  if (!otpServiceInstance) {
    otpServiceInstance = new OTPService()
  }
  return otpServiceInstance
}

import type { OTPProvider, OTPResponse } from "./types"

export class TwilioOTPProvider implements OTPProvider {
  private accountSid: string
  private authToken: string
  private fromNumber: string
  private whatsappNumber: string

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID!
    this.authToken = process.env.TWILIO_AUTH_TOKEN!
    this.fromNumber = process.env.TWILIO_FROM_NUMBER!
    this.whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886"

    if (!this.accountSid || !this.authToken || !this.fromNumber) {
      console.error("Missing Twilio credentials:", {
        accountSid: !!this.accountSid,
        authToken: !!this.authToken,
        fromNumber: !!this.fromNumber,
      })
      throw new Error("Twilio credentials not found in environment variables")
    }

    console.log("[v0] Twilio initialized with:", {
      accountSid: this.accountSid,
      fromNumber: this.fromNumber,
      whatsappNumber: this.whatsappNumber,
    })
  }

  async sendOTP(phoneNumber: string, message?: string, channel: "sms" | "whatsapp" = "whatsapp"): Promise<OTPResponse> {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString()

      const defaultMessage =
        channel === "whatsapp"
          ? `Your UCFSIN verification code is: ${otp}. This code expires in 1 minute.`
          : `Your UCFSIN verification code is: ${otp}. This code will expire in 1 minute. Do not share this code with anyone.`

      let formattedPhone = phoneNumber
      if (!phoneNumber.startsWith("+")) {
        // For Indian numbers, add +91 prefix
        if (phoneNumber.length === 10) {
          formattedPhone = `+91${phoneNumber}`
        } else if (phoneNumber.length === 11 && phoneNumber.startsWith("91")) {
          formattedPhone = `+${phoneNumber}`
        } else {
          formattedPhone = `+91${phoneNumber}`
        }
      }

      const toNumber = channel === "whatsapp" ? `whatsapp:${formattedPhone}` : formattedPhone
      const fromNumber = channel === "whatsapp" ? `whatsapp:${this.whatsappNumber}` : this.fromNumber

      console.log("[v0] Sending OTP via", channel.toUpperCase(), ":", {
        to: toNumber,
        from: fromNumber,
        messageLength: (message || defaultMessage).length,
        originalPhone: phoneNumber,
        formattedPhone: formattedPhone,
      })

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.accountSid}:${this.authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: toNumber,
          From: fromNumber,
          Body: message || defaultMessage,
        }),
      })

      const data = await response.json()

      console.log("[v0] Twilio API Response:", {
        status: response.status,
        ok: response.ok,
        channel: channel,
        data: data,
        errorCode: data.error_code,
        errorMessage: data.error_message,
        moreInfo: data.more_info,
      })

      if (!response.ok) {
        console.error("[v0] Twilio API Error:", data)
        let errorMessage = data.message || `Twilio API Error: ${response.status}`

        if (channel === "whatsapp" && data.error_code === 63016) {
          errorMessage =
            "WhatsApp number not opted into sandbox. Please send 'join <sandbox-keyword>' to +14155238886 first."
        } else if (channel === "whatsapp" && data.error_code === 21211) {
          errorMessage = "Invalid WhatsApp number format. Please check the phone number."
        }

        return {
          success: false,
          error: errorMessage,
        }
      }

      // Store OTP in memory/cache for verification (in production, use Redis)
      await this.storeOTP(phoneNumber, otp)

      console.log("[v0] OTP sent successfully via", channel.toUpperCase(), ":", {
        messageId: data.sid,
        to: toNumber,
      })

      return {
        success: true,
        messageId: data.sid,
      }
    } catch (error) {
      console.error("[v0] Twilio OTP Error:", error)
      return {
        success: false,
        error: `Failed to send OTP: ${error instanceof Error ? error.message : "Unknown error"}`,
      }
    }
  }

  async verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
    try {
      const storedOTP = await this.getStoredOTP(phoneNumber)

      if (!storedOTP) {
        return false
      }

      const isValid = storedOTP.otp === otp && storedOTP.expiresAt > Date.now()

      if (isValid) {
        // Clear OTP after successful verification
        await this.clearOTP(phoneNumber)
      }

      return isValid
    } catch (error) {
      console.error("OTP Verification Error:", error)
      return false
    }
  }

  private async storeOTP(phoneNumber: string, otp: string): Promise<void> {
    // In production, use Redis or database
    // For now, using in-memory storage (not suitable for production)
    const otpData = {
      otp,
      expiresAt: Date.now() + 1 * 60 * 1000, // 1 minute
      attempts: 0,
    }

    // Store in global memory (replace with Redis in production)
    if (typeof global !== "undefined") {
      global.otpStore = global.otpStore || new Map()
      global.otpStore.set(phoneNumber, otpData)
    }
  }

  private async getStoredOTP(phoneNumber: string): Promise<any> {
    if (typeof global !== "undefined" && global.otpStore) {
      return global.otpStore.get(phoneNumber)
    }
    return null
  }

  private async clearOTP(phoneNumber: string): Promise<void> {
    if (typeof global !== "undefined" && global.otpStore) {
      global.otpStore.delete(phoneNumber)
    }
  }
}

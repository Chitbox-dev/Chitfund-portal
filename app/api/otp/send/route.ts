import { type NextRequest, NextResponse } from "next/server"
import { getOTPService } from "@/lib/otp/otp-service"
import { z } from "zod"

const sendOTPSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long"),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] OTP Send Request:", {
      phoneNumber: body.phoneNumber,
      hasMessage: !!body.message,
      requestBody: body,
    })

    const { phoneNumber, message } = sendOTPSchema.parse(body)

    console.log("[v0] Environment check:", {
      hasAccountSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasAuthToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasFromNumber: !!process.env.TWILIO_FROM_NUMBER,
      hasWhatsAppNumber: !!process.env.TWILIO_WHATSAPP_NUMBER,
      otpProvider: process.env.OTP_PROVIDER,
    })

    const otpService = getOTPService()
    const result = await otpService.sendOTP(phoneNumber, message, "whatsapp")

    console.log("[v0] OTP Service Result:", result)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully via WhatsApp",
        messageId: result.messageId,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("[v0] Send OTP API Error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid input: ${error.errors.map((e) => e.message).join(", ")}`,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

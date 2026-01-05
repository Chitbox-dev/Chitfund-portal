import { type NextRequest, NextResponse } from "next/server"
import { getOTPService } from "@/lib/otp/otp-service"
import { z } from "zod"

const verifyOTPSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, otp } = verifyOTPSchema.parse(body)

    const otpService = getOTPService()
    const isValid = await otpService.verifyOTP(phoneNumber, otp)

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: "OTP verified successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired OTP",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Verify OTP API Error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input format",
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

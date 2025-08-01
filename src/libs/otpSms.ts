interface SmsResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function sendOTP(
  phone: string,
  otpCode: string
): Promise<SmsResult> {
  try {
    const apiKey = process.env.KAVENEGAR_API_KEY;
    if (!apiKey) {
      throw new Error("Kavenegar API key is not configured");
    }

    // Normalize phone number format
    const normalizedPhone = phone.startsWith("0")
      ? `+98${phone.slice(1)}`
      : phone;

    // Use direct SMS endpoint (no template)
    const baseUrl = "https://api.kavenegar.com/v1";
    const endpoint = `${baseUrl}/${apiKey}/sms/send.json`;

    const params = new URLSearchParams({
      receptor: normalizedPhone,
      message: `کد تأیید شما: ${otpCode}\nاین کد تا ۱۰ دقیقه معتبر است.`,
      sender: process.env.KAVENEGAR_SENDER || "",
    });

    const response = await fetch(`${endpoint}?${params.toString()}`);
    const data = await response.json();

    if (data.return?.status === 200) {
      return {
        success: true,
        message: "SMS sent successfully",
      };
    }

    // Handle specific Kavenegar errors
    if (data.return?.status === 424) {
      return {
        success: false,
        error: "Template not configured. Using direct SMS failed.",
      };
    }

    return {
      success: false,
      error: data.return?.message || "Failed to send SMS",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("SMS Service Error:", error);
    return {
      success: false,
      error: error.message || "Failed to send SMS",
    };
  }
}

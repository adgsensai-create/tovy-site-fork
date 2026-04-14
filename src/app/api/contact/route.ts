import { NextResponse } from "next/server";

const WEB3FORMS_KEY = "3832175e-255f-4f9c-9406-1a460eebe07a";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, sessionType, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send via Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New Inquiry from ${firstName} ${lastName} — Tovy Photography`,
        from_name: "Tovy Photography Website",
        name: `${firstName} ${lastName}`,
        email,
        phone: phone || "Not provided",
        session_type: sessionType || "Not specified",
        message,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error("Web3Forms error:", result);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

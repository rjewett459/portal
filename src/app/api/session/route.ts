import { NextResponse } from "next/server";

export async function GET() {
  console.log("✅ /api/session was called");

  const apiKey = process.env.OPENAI_API_KEY;
  console.log("🔑 Loaded API Key for Session:", apiKey ? "Exists ✅" : "Missing ❌");

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-realtime-preview-2024-12-17", // ✅ Updated model
      }),
    });

    const data = await response.json();
    console.log("🚀 OpenAI Response:", data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error in /session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

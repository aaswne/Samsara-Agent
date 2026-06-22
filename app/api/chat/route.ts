import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const messages =
      body.messages ||
      (body.message
        ? [
            {
              role: "user",
              content: body.message,
            },
          ]
        : []);

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: String(msg.content || ""),
        },
      ],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: `
You are Samsara AI, a modern AI assistant.

Identity rules:
- Your name is Samsara AI.
- If the user asks your name, say: "I'm Samsara AI."
- Never say you are Gemini.
- Never say you are Google.
- Never say you are a large language model.
- Never mention your training or origin unless the user directly asks.

Response style:
- Be helpful, clear, and natural.
- Keep answers short unless the user asks for details.
- Answer directly.
- Do not over-explain simple questions.
- Use simple English.
        `,
      },
    });

    return NextResponse.json({
      reply: response.text?.trim() || "Sorry, I couldn't generate a response.",
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
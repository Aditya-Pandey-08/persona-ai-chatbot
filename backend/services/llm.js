import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askLLM({
  systemPrompt,
  personaData,
  history,
  userMessage,
}) {
  try {
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `
${systemPrompt}

=====================================
PERSONA DATA
=====================================

${personaData}
            `,
          },
        ],
      },
    ];

    for (const message of history) {
      contents.push(message);
    }

    contents.push({
      role: "user",
      parts: [
        {
          text: userMessage,
        },
      ],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    return response.text;

  } catch (error) {
    console.log("========== GEMINI ERROR ==========");
    console.error(error);
    console.log("Status:", error.status);
    console.log("Message:", error.message);
    console.log("==================================");
  
    return error.message;
  }
}
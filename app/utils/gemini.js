// /utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: 'v1'
});


console.log("MONGODB_URI starts with:", process.env.MONGODB_URI?.slice(0, 10));
console.log("GEMINI_PRIVATE_KEY starts with:", process.env.GEMINI_API_KEY?.slice(0, 20));

async function printAvailableModels() {
  try {
    const models = await genAI.listModels();
    console.log("Available models:", models);
  } catch (err) {
    console.error("Failed to list models:", err);
  }
}

// Optional: call it once if you want to test during development
// printAvailableModels();



export async function getInsightsFromGemini(babyData) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Based on this baby data: ${JSON.stringify(babyData)}, give:
  - Next feeding time
  - Predicted nap windows
  - Any fussy hour alerts
  - Current growth milestone
  - 1 tip for the week
  Respond in structured JSON`;

  const result = await model.generateContent(prompt);
  const response = await result.response.text();
  console.log("Gemini response text:", response);


  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      feeding: { nextFeed: "Unknown", prediction: "Unknown" },
      sleep: { nextNap: "Unknown", fussyHour: "Unknown" },
      growth: { milestone: "Unknown", tip: "Unknown" },
      confidenceScore: 0,
    };
  }
}


import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function run(blockchain_activity) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = `Generate a personalized horoscope prediction based on the following blockchain activity. The activity summary is provided to help you understand the context of the user's recent transactions and interactions. ${blockchain_activity}. The prediction should have four aspects, with two sentences for each aspect- General Overview, Finance and Career, Personal Growth and Innovation, Social and Relationship Dynamics.`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}



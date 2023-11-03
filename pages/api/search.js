import OpenAI from "openai";

export const config = {
  runtime: "edge",
};

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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"
});

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (req.method === "GET" && query) {
    const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-3.5-turbo",
    });
  
    const response = chatCompletion.choices[0].message.content;
    
    return res.status(200).json({ response });
  }
  res.status(200).json({ name: "John Doe" });
}
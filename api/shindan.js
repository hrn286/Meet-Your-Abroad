import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { answers } = req.body;

  const prompt = `
以下の回答をもとに、留学タイプを診断してください。

回答:
${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}
`;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  res.status(200).json({
    result: response.output_text,
  });
}

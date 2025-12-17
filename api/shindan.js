import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { answers } = req.body;

    const prompt = `
あなたは留学カウンセラーです。
以下の回答をもとに、向いている留学タイプを
初心者にも分かりやすく日本語で診断してください。

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

  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "AI診断中にエラーが起きました。少し時間を置いて試してね🙏"
    });
  }
}

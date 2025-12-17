export default async function handler(req, res) {
  try {
    const { answers } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
あなたは留学カウンセラーです。
以下の回答をもとに、初心者にも分かる日本語で
向いている留学タイプを診断してください。

回答:
${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}
`
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.output[0].content[0].text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "ごめん、AI診断でエラーが起きた😭 もう一回試してね"
    });
  }
}

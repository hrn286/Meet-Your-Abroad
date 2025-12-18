export default async function handler(req, res) {
  try {
    const { answers } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "あなたは優秀な留学カウンセラーです。初心者にも分かりやすく診断してください。"
          },
          {
            role: "user",
            content: `
以下の回答をもとに、向いている留学タイプを診断してください。

${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}
`
          }
        ]
      })
    });

    const data = await response.json();

    // 👇 ここで失敗理由も見える
    if (!data.choices) {
      console.error("OpenAI error response:", data);
      return res.status(500).json({
        result: "OpenAIからエラーが返ってきました。APIキーやモデルを確認してね🙏"
      });
    }

    const resultText = data.choices[0].message.content;

    res.status(200).json({
      result: resultText
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      result: "サーバー側でエラーが起きました😭"
    });
  }
}

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
        model: "gpt-4.1-mini",
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

    // 👇 ここは超シンプル
    const resultText = data.choices?.[0]?.message?.content;

    res.status(200).json({
      result: resultText || "診断はできましたが、文章の取得に失敗しました🙏"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "ごめん、AI診断でエラーが起きた😭 もう一回試してね"
    });
  }
}

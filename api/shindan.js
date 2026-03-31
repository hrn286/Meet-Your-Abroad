export default async function handler(req, res) {
  try {
    const { answers } = req.body;

    const prompt = `
あなたはプロの留学カウンセラーです。

以下のルールで診断してください。
【診断ルール】
・ユーザーの回答から価値観を読み取る
・留学プランを必ず3つ提案する

【出力ルール】
・HTMLタグのみ出力すること
・最初は必ず <div> から始めること
・説明文は禁止

【HTML形式】
<div class="plan-cards">
  <div class="plan-card">
    <h3>プラン名</h3>
    <p>内容</p>
  </div>
</div>

ユーザー回答：
${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data.candidates) {
      console.error("Gemini error:", data);
      return res.status(500).json({
        result: "AIエラーが出ました🙏"
      });
    }

    const resultText =
      data.candidates[0].content.parts[0].text;

    res.status(200).json({
      result: resultText
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "サーバーエラー😭"
    });
  }
} {
    console.error("Server error:", error);
    res.status(500).json({
      result: "サーバー側でエラーが起きました😭"
    });
  }
}

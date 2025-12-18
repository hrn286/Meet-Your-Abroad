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
            content: `
            あなたはプロの留学カウンセラーです。

            以下のルールで診断してください。
            
            【ルール】
            ・留学プランを必ず3つ提案
            ・HTML形式で出力する
            ・各プランはカードとして分ける
            
            【HTML形式（厳守）】
            <div class="plan-cards">
              <div class="plan-card">
                <h3>プラン名</h3>
                <p><strong>向いている理由：</strong>...</p>
                <p><strong>おすすめ地域：</strong>...</p>
                <p><strong>期間目安：</strong>...</p>
              </div>
            </div>

            文章だけでなく、必ずこのHTML構造で出力してください。
            `
        　 },
          {
            role: "user",
            content: `
            以下はユーザーの回答です。
            これをもとに留学プランを提案してください。
            
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

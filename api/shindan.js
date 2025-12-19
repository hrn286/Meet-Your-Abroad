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
            【診断ルール】
            ・ユーザーの回答から価値観を読み取る
            ・留学プランを必ず3つ提案する
            
            【出力ルール】
            ・以下のHTML構造を必ず使う
            ・\`\`\` や \`\`\`html などのコードブロック記法は使わない
            ・説明文は書かず、HTMLタグのみを出力する
            ・最初の文字は必ず <div> から始める

            【追加ルール】
            ・各プランに「おすすめ国」を1〜2カ国指定する
            ・各国に対応する国旗画像URLも一緒に出力する
            ・国旗は img タグで表示する
            ・国旗URLは以下の形式を使うこと：
              https://flagcdn.com/w40/jp.png
              https://flagcdn.com/w40/au.png
              https://flagcdn.com/w40/ca.png
              https://flagcdn.com/w40/us.png
              https://flagcdn.com/w40/gb.png
            ・国名に対応するISO2コードは必ず小文字で使用する（例：us, jp）
            


            【HTML形式（厳守）】
            <div class="plan-cards">
              <div class="plan-card">
                <h3>プラン名</h3>

                <div class="country-flags">
                  <div class="country">
                    <img src="国旗URL" alt="国名">
                    <span>国名</span>
                  </div>
                </div>
                
                <p><strong>向いている理由：</strong>...</p>
                <p><strong>おすすめ地域：</strong>...</p>
                <p><strong>期間目安：</strong>...</p>
              </div>
            </div>
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

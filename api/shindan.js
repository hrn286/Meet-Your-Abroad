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
            ・回答内容から価値観・志向を読み取る
            ・留学先の「地域・国・スタイル」を具体的に提案
            ・必ず3つの留学プランを出す
            ・初心者にも分かる言葉を使う
            
            【出力形式】
            ① あなたの傾向まとめ（2〜3行）
            ② おすすめ留学プラン3つ
              - プラン名
              - 向いている理由
              - おすすめ地域・国
              - 期間の目安
            ③ 応援メッセージ
            `
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

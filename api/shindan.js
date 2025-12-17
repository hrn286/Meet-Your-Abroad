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
以下の回答をもとに、初心者にも分かりやすく
日本語で留学タイプを診断してください。

回答:
${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}
`
      })
    });

    const data = await response.json();

    // 👇 ここが超重要（安全に取り出す）
    let resultText = "";

    if (data.output_text) {
      resultText = data.output_text;
    } else if (
      data.output &&
      data.output[0] &&
      data.output[0].content &&
      data.output[0].content[0] &&
      data.output[0].content[0].text
    ) {
      resultText = data.output[0].content[0].text;
    } else {
      resultText = "診断は完了しましたが、結果の取得に失敗しました🙏";
    }

    res.status(200).json({
      result: resultText
    });

  } catch (error) {
    console.error("AI診断エラー:", error);
    res.status(500).json({
      result: "ごめん、AI診断でエラーが起きた😭 もう一回試してね"
    });
  }
}


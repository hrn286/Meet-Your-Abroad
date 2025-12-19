export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  // 最低限のバリデーション
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "入力内容に不備があります",
    });
  }

  // ここで「ちゃんと届いてる」
  console.log("📩 CONTACT FORM");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  return res.status(200).json({
    message: "送信成功",
  });
}

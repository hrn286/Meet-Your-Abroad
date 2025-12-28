// NOTE:
// 現在お問い合わせフォームは Web3Forms を使用しています。
// このAPIは未使用です。

export default function handler(req, res) {
  return res.status(404).json({ message: "Not used" });
}


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY_CONTACT);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      message: "入力内容に不備があります",
    });
  }

  try {
    await resend.emails.send({
      from: "Meet Your Abroad <onboarding@resend.dev>",
      to: "meetyourabroad@gmail.com",
      reply_to: email,
      subject: "【CONTACT】お問い合わせが届きました",
      text:
        `送信者メール: ${email}\n\n` +
        `---\n${message}`,
    });

    return res.status(200).json({
      message: "送信成功",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "メール送信に失敗しました",
    });
  }
}


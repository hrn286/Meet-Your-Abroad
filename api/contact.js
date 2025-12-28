import com.resend.*;

public class Main {
    public static void main(String[] args) {
        Resend resend = new Resend("re_4vEGsXfo_54x7MtihphGdSQ4hRp1QD5z1");

        SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
                .from("onboarding@resend.dev")
                .to("meetyourabroad@gmail.com")
                .subject("お問い合わせ")
                .build();

        SendEmailResponse data = resend.emails().send(sendEmailRequest);
    }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, message } = req.body;

  // 最低限のバリデーション
  if (!email || !message) {
    return res.status(400).json({
      message: "入力内容に不備があります",
    });
  }

  // ここで「ちゃんと届いてる」
  console.log("📩 CONTACT FORM");
  console.log("Email:", email);
  console.log("Message:", message);

  return res.status(200).json({
    message: "送信成功",
  });
}

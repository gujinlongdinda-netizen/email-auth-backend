import type { VercelRequest, VercelResponse } from "vercel";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "缺少邮箱" });
  }

  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { email: process.env.BREVO_SENDER },
        to: [{ email }],
        subject: "登录验证码",
        htmlContent: `<p>你的验证码是 <b>${code}</b></p>`,
      }),
    });

    return res.status(200).json({ message: "验证码已发送" });
  } catch (err) {
    return res.status(500).json({ message: "发送失败" });
  }
}

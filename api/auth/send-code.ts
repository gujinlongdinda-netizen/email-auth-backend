import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  /* ======== CORS 核心配置 ======== */
  res.setHeader("Access-Control-Allow-Origin", "https://5wbd98kqhk.coze.site/");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // ✅ 必须处理 OPTIONS（浏览器预检）
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ❌ 只允许 POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // ===== 这里先不调用 Brevo，用假数据测试 =====
    console.log("准备发送验证码给：", email);

    return res.status(200).json({
      message: "验证码已发送（测试成功）",
    });
  } catch (err: any) {
    console.error("发送失败:", err);
    return res.status(500).json({ error: "Server error" });
  }
}


export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { role, mobile, password } = req.body;

  const users = {
    anm:     { mobile: "9999999999", password: "anm123", name: "Rekha Devi" },
    phc:     { mobile: "8888888888", password: "phc123", name: "PHC Officer" },
    doctor:  { mobile: "7777777777", password: "doc123", name: "Dr. Sharma" }
  };

  const user = users[role];

  if (!user || user.mobile !== mobile || user.password !== password) {
    return res.status(401).json({ success:false,message:"Invalid login" });
  }

  return res.status(200).json({
    success: true,
    token: "token_" + Math.random().toString(36).slice(2),
    user: { name: user.name, role }
  });
}

// pages/api/auth/login.js
export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, message: "Method not allowed" });

  const { role, mobile, password } = req.body;

  const users = {
    anm:    { mobile: "9999999999", password: "anm123",  name: "Rekha Devi", role: "anm" },
    phc:    { mobile: "8888888888", password: "phc123",  name: "PHC Officer", role: "phc" },
    doctor: { mobile: "7777777777", password: "doc123",  name: "Dr. Sharma", role: "doctor" },
  };

  const user = users[role];

  if (!user || user.mobile !== mobile || user.password !== password) {
    return res.status(401).json({ success:false, message: "Invalid credentials" });
  }

  const token = "token_" + Math.random().toString(36).slice(2);

  return res.status(200).json({
    success: true,
    token,
    user: { name: user.name, role: user.role }
  });
}

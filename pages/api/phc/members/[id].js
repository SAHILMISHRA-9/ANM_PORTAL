// pages/api/phc/members/[id].js
import { getMember } from "../../../../data/familyDb";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const m = getMember(id);
      if (!m) return res.status(404).json({ error: "Member not found" });
      return res.status(200).json(m);
    } catch (err) {
      console.error("Member detail error:", err);
      return res.status(500).json({ error: "Failed to fetch member" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

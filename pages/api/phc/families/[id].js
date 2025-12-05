// pages/api/phc/families/[id].js
import { getFamily } from "../../../../data/familyDb";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const fam = getFamily(id);
      if (!fam) return res.status(404).json({ error: "Family not found" });
      return res.status(200).json(fam);
    } catch (err) {
      console.error("Family detail error:", err);
      return res.status(500).json({ error: "Failed to fetch family" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

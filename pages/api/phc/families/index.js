// pages/api/phc/families/index.js
import { getAllFamilies } from "../../../../data/familyDb";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const list = getAllFamilies();
      return res.status(200).json(list);
    } catch (err) {
      console.error("Families list error:", err);
      return res.status(500).json({ error: "Failed to fetch families" });
    }
  }

  // optional POST create (basic)
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      // addFamily not exported? if you added it in data file, use it, otherwise respond 405
      // For now just 405 (unless you need create now)
      return res.status(405).json({ error: "Create not implemented in this demo" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

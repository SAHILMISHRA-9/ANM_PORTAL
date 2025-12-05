// pages/api/phc/families/index.js
import { getAllFamilies, addFamily } from "../../../../data/familyDb";

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

  // simple POST create family
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      if (!body.address && !body.area_id) {
        return res.status(400).json({ error: "Provide address or area_id" });
      }
      const created = addFamily({
        address: body.address,
        area_id: body.area_id,
        asha_id: body.asha_id,
        anm_id: body.anm_id
      });
      return res.status(201).json(created);
    } catch (err) {
      console.error("Create family error:", err);
      return res.status(500).json({ error: "Failed to create family" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

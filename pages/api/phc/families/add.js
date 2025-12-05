// pages/api/phc/families/add.js
import { addFamily } from "../../../../data/familyDb";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    // minimal validation
    if (!body.address && !body.area_id) {
      return res.status(400).json({ error: "Provide at least address or area_id" });
    }

    const created = addFamily({
      address: body.address,
      area_id: body.area_id,
      asha_id: body.asha_id,
      anm_id: body.anm_id
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error("Add family error:", err);
    return res.status(500).json({ error: "Failed to add family" });
  }
}

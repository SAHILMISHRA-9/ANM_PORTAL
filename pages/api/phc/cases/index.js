// pages/api/phc/cases/index.js
import { getCases, createCase } from "../../../../data/healthRecordsDb";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, anm_id, asha_id, area_id, risk_level, date_from, date_to, q } = req.query;
      const list = getCases({ category, anm_id, asha_id, area_id, risk_level, date_from, date_to, q });
      return res.status(200).json(list);
    } catch (err) {
      console.error("Cases list error:", err);
      return res.status(500).json({ error: "Failed to fetch cases" });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body || {};
      const created = createCase(data);
      return res.status(201).json(created);
    } catch (err) {
      console.error("Create case error:", err);
      return res.status(500).json({ error: "Failed to create case" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}

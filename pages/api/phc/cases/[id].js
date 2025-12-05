// pages/api/phc/cases/[id].js
import { getCase, updateCase, deleteCase } from "../../../../data/healthRecordsDb";

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const t = getCase(id);
    if (!t) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(t);
  }

  if (req.method === "PUT") {
    try {
      const updates = req.body || {};
      const updated = updateCase(id, updates);
      if (!updated) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("Update case error:", err);
      return res.status(500).json({ error: "Failed to update" });
    }
  }

  if (req.method === "DELETE") {
    const ok = deleteCase(id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}

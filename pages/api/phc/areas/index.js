// pages/api/phc/areas/index.js
import { getAreas, createArea } from "../../../../data/areaDb";

export default function handler(req, res) {
  if (req.method === "GET") {
    const list = getAreas();
    return res.status(200).json(list);
  }

  if (req.method === "POST") {
    const payload = req.body || {};
    if (!payload.name) return res.status(400).json({ error: "name required" });
    const created = createArea(payload);
    return res.status(201).json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

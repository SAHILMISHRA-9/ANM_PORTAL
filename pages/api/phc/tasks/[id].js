// pages/api/phc/tasks/[id].js
import { updateTask, getTask } from "../../../../../data/tasksDb";


export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updates = req.body || {};
      // only allow certain fields
      const allowed = ["status", "high_risk", "assigned_asha", "assigned_anm"];
      const payload = {};
      for (const k of allowed) {
        if (k in updates) payload[k] = updates[k];
      }

      const updated = updateTask(id, payload);
      if (!updated) return res.status(404).json({ error: "Task not found" });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("Update task error:", err);
      return res.status(500).json({ error: "Failed to update task" });
    }
  }

  if (req.method === "GET") {
    const t = getTask(id);
    if (!t) return res.status(404).json({ error: "Task not found" });
    return res.status(200).json(t);
  }

  res.status(405).json({ error: "Method not allowed" });
}

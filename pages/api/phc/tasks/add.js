import { addTask } from "../../../../data/tasksDb";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const created = addTask(body);

    return res.status(201).json(created);
  } catch (err) {
    console.error("Task add error:", err);
    return res.status(500).json({ error: "Failed to add task" });
  }
}

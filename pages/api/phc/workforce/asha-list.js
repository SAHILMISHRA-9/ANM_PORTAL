import { getASHAs, addASHA } from "../../../../data/ashaDb.js";


export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(getASHAs());
  }

  if (req.method === "POST") {
    const newAsha = addASHA(req.body);
    return res.status(201).json(newAsha);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

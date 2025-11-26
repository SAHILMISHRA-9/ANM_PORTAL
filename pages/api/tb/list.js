export default function handler(req, res) {
  const data = [
    {
      id: 1,
      name: "Ram Kumar",
      age: 45,
      symptoms: ["Cough 2+ weeks", "Weight loss", "Fever"],
      status: "suspect",
    },
    {
      id: 2,
      name: "Sita Devi",
      age: 33,
      symptoms: ["Chest pain"],
      status: "treatment",
    },
    {
      id: 3,
      name: "Mohit Sharma",
      age: 50,
      symptoms: ["Blood in sputum"],
      status: "confirmed",
    },
    {
      id: 4,
      name: "Rani Kumari",
      age: 27,
      symptoms: ["Fever", "Weakness"],
      status: "high-risk",
    },
  ];

  res.status(200).json(data);
}

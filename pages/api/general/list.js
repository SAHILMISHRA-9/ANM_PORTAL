export default function handler(req, res) {
  const data = [
    {
      id: 1,
      name: "Ravi Kumar",
      age: 32,
      complaint: "High fever for 3 days",
      category: "fever",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Meena Devi",
      age: 28,
      complaint: "Seasonal viral symptoms",
      category: "viral",
      date: "2024-01-12",
    },
    {
      id: 3,
      name: "Anita Kumari",
      age: 41,
      complaint: "Severe body pain",
      category: "pain",
      date: "2024-01-20",
    },
    {
      id: 4,
      name: "Mohit Singh",
      age: 22,
      complaint: "Skin rash and itching",
      category: "skin",
      date: "2024-01-17",
    },
  ];

  res.status(200).json(data);
}

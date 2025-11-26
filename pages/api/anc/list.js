export default function handler(req, res) {
  const data = [
    {
      id: 1,
      name: "Rekha Devi",
      lmp: "2024-03-10",
      trimester: "2nd",
      phone: "9876543210",
      status: "high-risk",
    },
    {
      id: 2,
      name: "Suman Kumari",
      lmp: "2024-04-05",
      trimester: "1st",
      phone: "9123456780",
      status: "normal",
    },
    {
      id: 3,
      name: "Radha Kumari",
      lmp: "2024-02-14",
      trimester: "3rd",
      phone: "9988776655",
      status: "visit-due",
    },
  ];

  res.status(200).json(data);
}

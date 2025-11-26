export default function handler(req, res) {
  const data = [
    {
      id: 1,
      name: "Baby Rahul",
      age: "6 months",
      mother: "Rekha Devi",
      dueDose: "DPT1",
      status: "due",
    },
    {
      id: 2,
      name: "Baby Mahima",
      age: "1 year",
      mother: "Suman Kumari",
      dueDose: "-",
      status: "completed",
    },
    {
      id: 3,
      name: "Baby Aarav",
      age: "3 months",
      mother: "Sunita Devi",
      dueDose: "OPV2",
      status: "missed",
    },
    {
      id: 4,
      name: "Baby Riya",
      age: "8 months",
      mother: "Radha Kumari",
      dueDose: "Pentavalent2",
      status: "high-risk",
    },
  ];

  res.status(200).json(data);
}

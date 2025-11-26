export default function handler(req, res) {
  const data = [
    {
      id: 1,
      name: "Mahesh Kumar",
      age: 52,
      bp: "160/110",
      sugar: "240",
      status: "high-risk",
    },
    {
      id: 2,
      name: "Rekha Devi",
      age: 44,
      bp: "150/95",
      sugar: "180",
      status: "bp-high",
    },
    {
      id: 3,
      name: "Suresh Singh",
      age: 60,
      bp: "130/80",
      sugar: "290",
      status: "sugar-high",
    },
    {
      id: 4,
      name: "Mina Kumari",
      age: 36,
      bp: "118/76",
      sugar: "110",
      status: "normal",
    },
  ];

  res.status(200).json(data);
}

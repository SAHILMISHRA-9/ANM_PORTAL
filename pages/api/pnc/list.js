export default function handler(req, res) {
  const data = [
    {
      id: 1,
      name: "Sunita Devi",
      deliveryDate: "2024-01-22",
      babyAge: "28 days",
      visitCount: 2,
      status: "danger", // heavy bleeding, fever, etc.
    },
    {
      id: 2,
      name: "Kavita Kumari",
      deliveryDate: "2024-02-10",
      babyAge: "10 days",
      visitCount: 1,
      status: "follow-up-due",
    },
    {
      id: 3,
      name: "Rani Kumari",
      deliveryDate: "2024-01-01",
      babyAge: "1 month",
      visitCount: 3,
      status: "normal",
    },
  ];

  res.status(200).json(data);
}

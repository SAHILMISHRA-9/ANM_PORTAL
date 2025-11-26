export default function handler(req, res) {
  const data = [
    {
      id: 1,
      familyHead: "Ramesh Kumar",
      village: "Bhagwanpur",
      members: [
        { id: 101, name: "Ramesh Kumar", age: 45, gender: "Male" },
        { id: 102, name: "Rekha Devi", age: 40, gender: "Female" },
        { id: 103, name: "Baby Riya", age: 1, gender: "Female" },
      ],
    },
    {
      id: 2,
      familyHead: "Suresh Singh",
      village: "Harinagar",
      members: [
        { id: 201, name: "Suresh Singh", age: 50, gender: "Male" },
        { id: 202, name: "Sunita Devi", age: 46, gender: "Female" },
      ],
    },
  ];

  res.status(200).json(data);
}

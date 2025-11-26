export default function handler(req, res) {
  const data = [
    {
      id: 1,
      title: "Visit high-risk pregnancy case (Radha Kumari)",
      assignedBy: "PHC Doctor",
      assignedTo: "ANM Rekha",
      dueDate: "2024-02-10",
      status: "urgent",
      description: "Check BP, fetal movement, and refer if needed.",
      asha: "ASHA Suman",
      progress: 40,
    },
    {
      id: 2,
      title: "Child immunization follow-up",
      assignedBy: "ANM Rekha",
      assignedTo: "ASHA Rani",
      dueDate: "2024-02-12",
      status: "pending",
      description: "Baby Aarav missed DPT2 dose.",
      asha: "ASHA Rani",
      progress: 0,
    },
    {
      id: 3,
      title: "NCD patient re-check",
      assignedBy: "PHC NCD Incharge",
      assignedTo: "ANM Rekha",
      dueDate: "2024-02-08",
      status: "in-progress",
      description: "Follow-up BP & sugar for Mahesh Kumar.",
      asha: "ASHA Parvati",
      progress: 60,
    },
    {
      id: 4,
      title: "TB suspect sputum collection",
      assignedBy: "PHC Lab",
      assignedTo: "ANM Rekha",
      dueDate: "2024-02-09",
      status: "overdue",
      description: "Collect sputum sample from Ram Kumar.",
      asha: "ASHA Sita",
      progress: 20,
    },
  ];

  res.status(200).json(data);
}

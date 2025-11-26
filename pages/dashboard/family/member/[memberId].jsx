import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../../../components/layout/Sidebar";
import Navbar from "../../../../components/layout/Navbar";
import axios from "axios";

export default function MemberDetail() {
  const router = useRouter();
  const { memberId } = router.query;

  const [member, setMember] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    if (!memberId) return;

    async function load() {
      const res = await axios.get("/api/family/list");

      // Find member in any family
      let found = null;
      for (const f of res.data) {
        const m = f.members.find((x) => x.id == memberId);
        if (m) found = m;
      }
      setMember(found);

      // Mock timeline
      setTimeline([
        { date: "2024-01-10", type: "ANC Visit", note: "BP checked, normal" },
        { date: "2024-01-20", type: "General Visit", note: "Fever treated" },
        { date: "2024-01-25", type: "NCD Screening", note: "BP high" },
      ]);
    }

    load();
  }, [memberId]);

  if (!member)
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64 p-6">Loading...</div>
      </div>
    );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-gray-600">
            {member.age} years • {member.gender}
          </p>

          {/* Timeline */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Health Timeline</h2>

            <div className="space-y-3">
              {timeline.map((t, i) => (
                <div key={i} className="border p-3 rounded">
                  <p className="font-medium">{t.date}</p>
                  <p className="text-sm text-blue-600">{t.type}</p>
                  <p className="text-sm">{t.note}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import Navbar from "../../../components/layout/Navbar";
import axios from "axios";

export default function ASHADetail() {
  const router = useRouter();
  const { id } = router.query;

  const [asha, setAsha] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await axios.get("/api/asha/performance");
        const match = res.data.find((x) => x.id == id);
        if (match) setAsha(match);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [id]);

  if (!asha)
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 p-6">Loading...</div>
      </div>
    );

  const breakdown = asha.visitBreakdown;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">{asha.name}</h1>

          {/* Overview */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Overview</h2>
            <p>Total Visits: {asha.totalVisits}</p>
            <p>Completed Tasks: {asha.completedTasks}</p>
            <p>Pending Tasks: {asha.pendingTasks}</p>
            <p>High-Risk Cases Identified: {asha.highRiskCases}</p>
            <p>Last Sync: {asha.lastSync}</p>
          </section>

          {/* Breakdown */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Visit Breakdown</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <p>ANC Visits: <b>{breakdown.anc}</b></p>
              <p>PNC Visits: <b>{breakdown.pnc}</b></p>
              <p>Child Visits: <b>{breakdown.child}</b></p>
              <p>NCD Visits: <b>{breakdown.ncd}</b></p>
              <p>TB Visits: <b>{breakdown.tb}</b></p>
              <p>General Visits: <b>{breakdown.general}</b></p>
            </div>
          </section>

          {/* Score */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Performance Score</h2>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                style={{ width: `${asha.performanceScore}%` }}
                className="h-3 bg-green-600 rounded"
              ></div>
            </div>
            <p className="mt-2 text-sm">{asha.performanceScore}%</p>
          </section>
        </main>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import SidebarPHC from "../../../components/layout/SidebarPHC";
import Navbar from "../../../components/layout/Navbar";
import PerformanceCharts from "../../../components/performance/PerformanceCharts";

export default function WorkforceDashboard() {
  const [ashas, setAshas] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedAsha, setSelectedAsha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const resAsha = await axios.get("/api/phc/workforce/asha-list");
      const list = resAsha.data || [];

      setAshas(list);

      let perf = [];
      for (const a of list) {
        const res = await axios.get(`/api/phc/workforce/performance/${a.id}`);
        perf.push({ asha_id: a.id, asha: a.name, ...res.data });
      }

      setPerformanceData(perf);

      // Default selected ASHA = first ASHA in list
      if (perf.length > 0) setSelectedAsha(perf[0].asha_id);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const active = ashas.filter(a => a.is_active).length;
  const disabled = ashas.filter(a => !a.is_active).length;

  const avgScore =
    performanceData.reduce((acc, p) => acc + p.performance_score, 0) /
    performanceData.length;

  const selectedPerf = performanceData.find(p => p.asha_id === selectedAsha);

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />

      <div className="flex-1 ml-60">
        <Navbar />

        <main className="p-6 mt-16">
          <h1 className="text-2xl font-bold mb-6">Workforce Analytics Dashboard</h1>

          {/* METRIC CARDS */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-5 rounded shadow">
              <p className="text-gray-600">Total ASHAs</p>
              <h2 className="text-3xl font-bold">{ashas.length}</h2>
            </div>

            <div className="bg-white p-5 rounded shadow">
              <p className="text-gray-600">Active ASHAs</p>
              <h2 className="text-3xl font-bold text-green-600">{active}</h2>
            </div>

            <div className="bg-white p-5 rounded shadow">
              <p className="text-gray-600">Disabled ASHAs</p>
              <h2 className="text-3xl font-bold text-red-600">{disabled}</h2>
            </div>
          </div>

          {/* AVERAGE SCORE */}
          <div className="bg-white p-5 rounded shadow mb-6">
            <p className="text-gray-600">Average Performance Score</p>
            <h2 className="text-4xl font-bold">{avgScore.toFixed(1)}%</h2>
          </div>

          {/* ASHA SELECTOR */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <p className="text-gray-600 mb-2 font-medium">Select ASHA for Performance Analytics</p>
            <select
              value={selectedAsha}
              onChange={(e) => setSelectedAsha(Number(e.target.value))}
              className="p-2 border rounded w-full"
            >
              {performanceData.map((p) => (
                <option key={p.asha_id} value={p.asha_id}>
                  {p.asha}
                </option>
              ))}
            </select>
          </div>

          {/* INDIVIDUAL ASHA PERFORMANCE CARDS */}
          <h2 className="text-xl font-semibold mb-3">ASHA Performance Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {performanceData.map((p) => (
              <div key={p.asha_id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">{p.asha}</h3>
                <p className="text-sm text-gray-600">
                  Score: <strong>{p.performance_score}%</strong>
                </p>
                <p className="text-sm text-gray-600">Visits: {p.visits_this_month}</p>
                <p className="text-sm text-gray-600">Tasks: {p.tasks_completed}</p>
              </div>
            ))}
          </div>

          {/* PERFORMANCE CHARTS FOR SELECTED ASHA */}
          <h2 className="text-xl font-semibold mb-3">Performance Trends</h2>

          {selectedPerf ? (
            <PerformanceCharts history={selectedPerf.history || []} />
          ) : (
            <p className="text-gray-500">No performance data available.</p>
          )}

        </main>
      </div>
    </div>
  );
}

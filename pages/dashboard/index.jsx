import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import axios from "axios";
import Link from "next/link";

export default function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("/api/dashboard/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to load dashboard summary", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !summary) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Navbar />
          <main className="p-6 text-center">Loading dashboard…</main>
        </div>
      </div>
    );
  }

  const {
    kpis,
    highRiskCases,
    moduleSummaries,
    report_url,
  } = summary;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="p-6 container">
          {/* HEADER */}
          <section className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Welcome to ANM Portal</h1>
            <p className="text-sm text-gray-500">
              Comprehensive maternal and child health management system for health workers
            </p>
          </section>

          {/* KPI CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpis.map((k, i) => (
              <div key={i} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">{k.label}</div>
                  <div className="text-2xl font-semibold mt-1">{k.value}</div>
                </div>
                <div className="text-3xl text-gray-300">{k.icon}</div>
              </div>
            ))}
          </section>

          {/* HIGH-RISK DASHBOARD */}
          <section className="mb-6">
            <div className="border rounded-lg bg-red-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-red-600 font-semibold">⚠️ PRIORITY</span>
                    <h2 className="text-lg font-bold">High-Risk Dashboard</h2>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    View all cases across categories marked as high-risk.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-red-700">{highRiskCases.total}</div>
                  <div className="text-sm text-gray-500">Requires attention</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {highRiskCases.top.map((h) => (
                  <div key={h.id} className="bg-white p-3 rounded shadow">
                    <div className="text-sm text-gray-500">{h.category}</div>
                    <div className="font-medium">{h.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{h.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GROUPED MODULES */}
          <section className="space-y-10">
            {/* MATERNAL HEALTH */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Maternal Health</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {moduleSummaries
                  .filter((m) => m.group === "maternal")
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={m.href}
                      className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm text-gray-500">{m.title}</div>
                          <div className="text-xl font-semibold mt-1">{m.count}</div>
                          <div className="text-xs text-gray-400 mt-1">{m.subtitle}</div>
                        </div>
                        <div className="text-3xl text-gray-200">{m.icon}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* CHILD HEALTH */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Child Health</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {moduleSummaries
                  .filter((m) => m.group === "child")
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={m.href}
                      className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm text-gray-500">{m.title}</div>
                          <div className="text-xl font-semibold mt-1">{m.count}</div>
                          <div className="text-xs text-gray-400 mt-1">{m.subtitle}</div>
                        </div>
                        <div className="text-3xl text-gray-200">{m.icon}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* SCREENING */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Screening & Monitoring</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {moduleSummaries
                  .filter((m) => m.group === "screening")
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={m.href}
                      className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm text-gray-500">{m.title}</div>
                          <div className="text-xl font-semibold mt-1">{m.count}</div>
                        </div>
                        <div className="text-3xl text-gray-200">{m.icon}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* OPERATIONS */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Operations & Administration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {moduleSummaries
                  .filter((m) => m.group === "ops")
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={m.href}
                      className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm text-gray-500">{m.title}</div>
                          <div className="text-xl font-semibold mt-1">{m.count}</div>
                          <div className="text-xs text-gray-400 mt-1">{m.subtitle}</div>
                        </div>
                        <div className="text-3xl text-gray-200">{m.icon}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>

          
        </main>
      </div>
    </div>
  );
}

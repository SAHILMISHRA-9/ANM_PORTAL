// pages/dashboard/pnc/[id].jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../../components/layout/Sidebar";
import Navbar from "../../../components/layout/Navbar";
import axios from "axios";

export default function PNCDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // For adding a visit client-side (mock)
  const [showAdd, setShowAdd] = useState(false);
  const [newVisit, setNewVisit] = useState({
    date: "",
    type: "Follow-up",
    asha: "",
    vitals: "",
    notes: "",
  });

  useEffect(() => {
    if (!id) return;
    async function load() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/pnc/detail?id=${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch PNC detail", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleAddVisit = (e) => {
    e.preventDefault();
    if (!newVisit.date || !newVisit.asha) {
      alert("Please fill date and ASHA name");
      return;
    }
    // create a local visit id
    const visit = {
      id: Math.floor(Math.random() * 100000),
      date: newVisit.date,
      type: newVisit.type,
      asha: newVisit.asha,
      vitals: { raw: newVisit.vitals },
      notes: newVisit.notes,
    };
    setData((prev) => ({ ...prev, visits: [visit, ...(prev?.visits || [])] }));
    setShowAdd(false);
    setNewVisit({ date: "", type: "Follow-up", asha: "", vitals: "", notes: "" });
  };

  const markHighRisk = (flag) => {
    // toggle a simple high-risk flag - in real app call backend
    if (!data) return;
    setData((prev) => ({
      ...prev,
      riskFlags: [...prev.riskFlags, { code: flag, label: flag, severity: "high", note: "Marked by ANM" }]
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Navbar />
          <main className="p-6 text-center">Loading PNC detail…</main>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Navbar />
          <main className="p-6 text-center text-red-600">PNC record not found</main>
        </div>
      </div>
    );
  }

  const { mother, baby, visits, riskFlags } = data;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">PNC — {mother.name}</h1>
              <p className="text-sm text-gray-600">Delivery: {mother.deliveryDate} • Age: {mother.age}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAdd(true)}
                className="bg-blue-600 text-white px-3 py-2 rounded shadow"
              >
                + Add Visit
              </button>
              <button
                onClick={() => { if (confirm("Mark mother as high-risk?")) markHighRisk("marked-high-risk"); }}
                className="bg-red-500 text-white px-3 py-2 rounded shadow"
              >
                Mark High-Risk
              </button>
            </div>
          </div>

          {/* Main two-column cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mother card */}
            <div className="col-span-2 bg-white rounded shadow p-4">
              <h3 className="font-semibold mb-2">Mother Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Name:</span> {mother.name}</div>
                <div><span className="text-gray-500">Phone:</span> {mother.phone}</div>
                <div><span className="text-gray-500">Address:</span> {mother.address}</div>
                <div><span className="text-gray-500">Gravida / Parity:</span> {mother.gravida} / {mother.parity}</div>
                <div><span className="text-gray-500">Delivery date:</span> {mother.deliveryDate}</div>
              </div>

              {/* Risk flags (if any) */}
              {riskFlags && riskFlags.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-red-600">Active Risk Alerts</h4>
                  <div className="mt-2 grid gap-2">
                    {riskFlags.map((r, idx) => (
                      <div key={idx} className="p-2 bg-red-50 border-l-4 border-red-300 rounded">
                        <div className="text-sm font-medium">{r.label} <span className="text-xs text-gray-400">({r.severity})</span></div>
                        <div className="text-xs text-gray-500 mt-1">{r.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Baby card */}
            <div className="bg-white rounded shadow p-4">
              <h3 className="font-semibold mb-2">Baby Details</h3>
              <div className="text-sm space-y-1">
                <div><span className="text-gray-500">DOB:</span> {baby.dob}</div>
                <div><span className="text-gray-500">Weight:</span> {baby.weightKg} kg</div>
                <div><span className="text-gray-500">Breastfeeding:</span> {baby.breastfeeding}</div>
                <div><span className="text-gray-500">MUAC:</span> {baby.muac} cm</div>
                <div className="mt-2">
                  <div className="text-gray-500 text-sm">Immunization</div>
                  <ul className="text-sm mt-1 space-y-1">
                    {baby.immunization.map((v, i) => (
                      <li key={i} className="text-sm">{v.vaccine} — <span className="text-gray-500 text-xs">{v.date}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Visits timeline */}
          <section className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">PNC Visit History</h3>
              <div className="text-sm text-gray-500">{visits.length} visits</div>
            </div>

            <div className="mt-4 space-y-3">
              {visits.map((v) => (
                <div key={v.id} className="p-3 border rounded hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{v.type} — {v.date}</div>
                      <div className="text-xs text-gray-500">Visited by: {v.asha}</div>
                    </div>
                    <div className="text-xs text-gray-500">Vitals: {v.vitals?.temp || v.vitals?.raw || "—"} • {v.vitals?.bp || ""}</div>
                  </div>

                  <div className="mt-2 text-sm text-gray-700">{v.notes}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Add Visit modal-like inline form */}
          {showAdd && (
            <section className="bg-white rounded shadow p-4">
              <h3 className="font-semibold mb-3">Add New Visit (mock)</h3>
              <form onSubmit={handleAddVisit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="date"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit((p) => ({ ...p, date: e.target.value }))}
                  className="border px-3 py-2 rounded"
                  required
                />
                <select
                  value={newVisit.type}
                  onChange={(e) => setNewVisit((p) => ({ ...p, type: e.target.value }))}
                  className="border px-3 py-2 rounded"
                >
                  <option>Follow-up</option>
                  <option>PNC Day 1</option>
                  <option>PNC Day 7</option>
                </select>
                <input
                  type="text"
                  value={newVisit.asha}
                  onChange={(e) => setNewVisit((p) => ({ ...p, asha: e.target.value }))}
                  placeholder="ASHA name"
                  className="border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  value={newVisit.vitals}
                  onChange={(e) => setNewVisit((p) => ({ ...p, vitals: e.target.value }))}
                  placeholder="Vitals (temp, bp)"
                  className="border px-3 py-2 rounded md:col-span-2"
                />
                <textarea
                  value={newVisit.notes}
                  onChange={(e) => setNewVisit((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Notes / advice"
                  className="border px-3 py-2 rounded md:col-span-3"
                />
                <div className="md:col-span-3 flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowAdd(false)} className="px-3 py-2 border rounded">Cancel</button>
                  <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">Save Visit</button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

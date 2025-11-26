import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import Navbar from "../../../components/layout/Navbar";
import axios from "axios";

export default function ImmunizationDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [child, setChild] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [dose, setDose] = useState({
    vaccine: "",
    date: "",
    remarks: "",
  });

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        // Use mock detail based on list for now
        const res = await axios.get("/api/immunization/list");
        const match = res.data.find((c) => c.id == id);

        if (match) {
          setChild(match);
          setVisits([
            { vaccine: "BCG", date: "2024-02-01", remarks: "Given at birth" },
            { vaccine: "OPV1", date: "2024-03-01", remarks: "No issues" },
          ]);
        }

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const addDose = (e) => {
    e.preventDefault();

    setVisits((prev) => [
      { ...dose },
      ...prev
    ]);

    setDose({ vaccine: "", date: "", remarks: "" });
    setShowAdd(false);
  };

  if (loading)
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64 p-6">Loading…</div>
      </div>
    );

  if (!child)
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64 p-6">Child not found</div>
      </div>
    );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{child.name}</h1>
              <p className="text-sm text-gray-600">
                Age: {child.age} • Mother: {child.mother}
              </p>
            </div>

            <button
              className="bg-blue-600 text-white px-3 py-2 rounded"
              onClick={() => setShowAdd(true)}
            >
              + Add Dose
            </button>
          </div>

          {/* CHILD PROFILE */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Immunization Summary</h2>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-500">Status:</span> {child.status}</div>
              <div><span className="text-gray-500">Next Due:</span> {child.dueDose || "None"}</div>
            </div>
          </section>

          {/* DOSE HISTORY */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Vaccination History</h2>

            <div className="mt-3 space-y-3">
              {visits.map((v, i) => (
                <div key={i} className="p-3 border rounded hover:shadow-sm">
                  <div className="flex justify-between">
                    <div className="font-medium">{v.vaccine}</div>
                    <div className="text-sm text-gray-500">{v.date}</div>
                  </div>
                  <div className="text-sm mt-1">{v.remarks}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ADD DOSE */}
          {showAdd && (
            <section className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Add Vaccination Dose</h2>

              <form onSubmit={addDose} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Vaccine name"
                  value={dose.vaccine}
                  onChange={(e) => setDose({ ...dose, vaccine: e.target.value })}
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="date"
                  value={dose.date}
                  onChange={(e) => setDose({ ...dose, date: e.target.value })}
                  className="border p-2 rounded"
                  required
                />

                <textarea
                  placeholder="Remarks"
                  value={dose.remarks}
                  onChange={(e) => setDose({ ...dose, remarks: e.target.value })}
                  className="border p-2 rounded md:col-span-2"
                />

                <div className="flex gap-2 justify-end md:col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="px-3 py-2 border rounded"
                  >
                    Cancel
                  </button>

                  <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">
                    Save Dose
                  </button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

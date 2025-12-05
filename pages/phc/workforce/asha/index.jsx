// pages/phc/workforce/asha/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";

export default function ASHAList() {
  const [list, setList] = useState([]);
  const [anms, setAnms] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const resAsha = await axios.get("/api/phc/workforce/asha-list");
      setList(resAsha.data || []);

      const resAnm = await axios.get("/api/phc/workforce/anm-list");
      setAnms(resAnm.data || []);

      const resAreas = await axios.get("/api/phc/workforce/summary");
      setAreas(resAreas.data?.areas || []);
    } catch (err) {
      console.error("ASHA list load error:", err);
    } finally {
      setLoading(false);
    }
  }

  function getANMName(id) {
    const anm = anms.find((a) => a.id == id);
    return anm ? anm.name : "—";
  }

  function getAreaName(id) {
    const area = areas.find((a) => a.id == id);
    return area ? area.name : "—";
  }

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />

      <div className="flex-1 ml-60">
        <Navbar />

        <main className="p-6 mt-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">ASHA Workers</h1>

            <Link
              href="/phc/workforce/asha/add"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add ASHA
            </Link>
          </div>

          {loading ? (
            <div>Loading ASHA workers…</div>
          ) : list.length === 0 ? (
            <div className="text-gray-600">No ASHA workers found.</div>
          ) : (
            <div className="space-y-3">
              {list.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-sm text-gray-600">Phone: {a.phone}</div>
                    <div className="text-sm text-gray-600">ANM: {getANMName(a.supervisor_id)}</div>
                    <div className="text-sm text-gray-600">Area: {getAreaName(a.area_id)}</div>

                    {/* ⭐ STATUS DISPLAY ADDED HERE */}
                    <div className="text-sm mt-1">
                      Status:{" "}
                      {a.is_active ? (
                        <span className="text-green-600 font-semibold">Active</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Disabled</span>
                      )}
                    </div>
                    {/* ⭐ END STATUS */}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/phc/workforce/asha/${a.id}`}
                      className="text-blue-600"
                    >
                      View
                    </Link>

                    <Link
                      href={`/phc/workforce/asha/edit/${a.id}`}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

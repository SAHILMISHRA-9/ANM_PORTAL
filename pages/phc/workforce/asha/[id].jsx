// pages/phc/workforce/asha/[id].jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";

export default function ASHADetails() {
  const router = useRouter();
  const { id } = router.query;

  const [asha, setAsha] = useState(null);
  const [anmList, setAnmList] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        // Load ASHA details
        const resAsha = await axios.get(`/api/phc/workforce/asha/${id}`);
        setAsha(resAsha.data);

        // Load ANM list so we can show the supervisor name
        const resAnm = await axios.get(`/api/phc/workforce/anm-list`);
        setAnmList(resAnm.data || []);

        // Load areas list
        const resAreas = await axios.get(`/api/phc/workforce/summary`);
        setAreas(resAreas.data?.areas || []);
      } catch (err) {
        console.error("ASHA Details Load Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!asha) return <div className="p-6">ASHA not found.</div>;

  const supervisor = anmList.find((a) => a.id == asha.supervisor_id);
  const area = areas.find((x) => x.id == asha.area_id);

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />

      <div className="flex-1 ml-60">
        <Navbar />

        <main className="p-6 mt-16 max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">ASHA Details</h1>

          {/* MAIN DETAILS CARD */}
          <div className="bg-white p-5 shadow rounded mb-6">
            <h2 className="text-xl font-semibold mb-2">{asha.name}</h2>

            <p><strong>Email:</strong> {asha.email || "—"}</p>
            <p><strong>Phone:</strong> {asha.phone}</p>
            <p><strong>Supervisor (ANM):</strong> {supervisor ? supervisor.name : "—"}</p>
            <p><strong>Area Assigned:</strong> {area ? area.name : "—"}</p>

            {/* STATUS DISPLAY */}
            <p>
              <strong>Status:</strong>{" "}
              {asha.is_active ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-600">Disabled</span>
              )}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="bg-white p-5 shadow rounded mb-6">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>

            <div className="flex gap-3 flex-wrap">
              
              <Link
                href={`/phc/workforce/asha/edit/${asha.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit ASHA
              </Link>

              <Link
                href={`/phc/workforce/asha/assign-anm/${asha.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Assign ANM
              </Link>

              <Link
                href={`/phc/workforce/asha/assign-area/${asha.id}`}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Assign Area
              </Link>

              <Link
                href={`/phc/workforce/performance/${asha.id}`}
                className="bg-yellow-500 text-black px-4 py-2 rounded"
              >
                View Performance
              </Link>

              {/* ⭐ ENABLE / DISABLE BUTTON ADDED HERE */}
              <button
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      `/api/phc/workforce/asha/toggle-status/${asha.id}`
                    );

                    alert(
                      res.data.is_active ? "ASHA Enabled" : "ASHA Disabled"
                    );

                    window.location.reload();
                  } catch (err) {
                    console.error(err);
                    alert("Failed to change status");
                  }
                }}
                className={`px-4 py-2 rounded ${
                  asha.is_active
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {asha.is_active ? "Disable ASHA" : "Enable ASHA"}
              </button>
              {/* ⭐ END OF TOGGLE BUTTON */}

            </div>
          </div>

          {/* BACK BUTTON */}
          <Link href="/phc/workforce/asha" className="text-gray-700">
            ← Back to ASHA List
          </Link>
        </main>
      </div>
    </div>
  );
}

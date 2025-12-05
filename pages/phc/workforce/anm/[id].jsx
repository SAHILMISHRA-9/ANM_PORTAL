import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";

export default function ANMDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [anm, setAnm] = useState(null);
  const [areas, setAreas] = useState([]);
  const [ashaList, setAshaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD ANM DETAILS
  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        // Load ANM basic details
        const res1 = await axios.get(`/api/phc/workforce/anm/${id}`);
        setAnm(res1.data);

        // Load assigned areas
        const res2 = await axios.get(`/api/phc/workforce/anm/areas/${id}`);
        setAreas(res2.data || []);

        // Load ASHAs under this ANM
        const res3 = await axios.get(`/api/phc/workforce/asha-list`);
        const filtered = res3.data.filter((a) => a.supervisor_id == id);
        setAshaList(filtered);
      } catch (err) {
        console.error("ANM DETAILS ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!anm) return <div className="p-6">ANM not found.</div>;

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />

      <div className="flex-1 ml-60">
        <Navbar />

        <main className="p-6 mt-16 max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">ANM Details</h1>

          {/* DETAILS CARD */}
          <div className="bg-white p-5 shadow rounded mb-6">
            <h2 className="text-xl font-semibold mb-3">{anm.name}</h2>

            <p><strong>Email:</strong> {anm.email}</p>
            <p><strong>Phone:</strong> {anm.phone}</p>
            <p><strong>HR ID:</strong> {anm.hr_id}</p>
          </div>

          {/* AREA CARD */}
          <div className="bg-white p-5 shadow rounded mb-6">
            <h3 className="text-lg font-semibold mb-2">Assigned Areas</h3>

            {areas.length === 0 ? (
              <p className="text-gray-600">No areas assigned.</p>
            ) : (
              <ul className="list-disc ml-6">
                {areas.map((area) => (
                  <li key={area.id}>{area.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* ASHA CARD */}
          <div className="bg-white p-5 shadow rounded mb-6">
            <h3 className="text-lg font-semibold mb-2">ASHAs Under This ANM</h3>

            {ashaList.length === 0 ? (
              <p className="text-gray-600">No ASHAs assigned.</p>
            ) : (
              <ul className="list-inside">
                {ashaList.map((asha) => (
                  <li key={asha.id}>
                    <Link
                      href={`/phc/workforce/asha/${asha.id}`}
                      className="text-blue-600 underline"
                    >
                      {asha.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <Link
              href={`/phc/workforce/anm/edit/${anm.id}`}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Edit ANM
            </Link>
            <Link
              href={`/phc/workforce/anm/reset-password/${anm.id}`}
              className="bg-red-600 text-white px-4 py-2 rounded"
>
            Reset Password
            
            </Link>


            <Link
              href="/phc/workforce/anm"
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Back
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

// pages/phc/workforce/anm/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";

export default function ANMList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("/api/phc/workforce/anm-list");
        setList(res.data || []);
      } catch (err) {
        console.error("ANM list load error:", err);
        setList([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-6 mt-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">ANM Workers</h1>
            <Link href="/phc/workforce/anm/add" className="bg-blue-600 text-white px-4 py-2 rounded">
              + Add ANM
            </Link>
          </div>

          {loading ? (
            <div>Loading ANM workers…</div>
          ) : list.length === 0 ? (
            <div className="text-gray-600">No ANM workers found.</div>
          ) : (
            <div className="space-y-3">
              {list.map((a) => (
                <div key={a.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-sm text-gray-500">Phone: {a.phone}</div>
                    <div className="text-sm text-gray-500">Areas: {a.areas?.join(", ") || "—"}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/phc/workforce/anm/${a.id}`} className="text-blue-600">
                      View
                    </Link>
                    <Link href={`/phc/workforce/anm/${a.id}`} className="px-3 py-1 border rounded text-sm">
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

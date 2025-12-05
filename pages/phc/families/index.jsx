// pages/phc/families/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarPHC from "../../../components/layout/SidebarPHC";
import Navbar from "../../../components/layout/Navbar";
import Link from "next/link";

export default function FamiliesList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await axios.get("/api/phc/families");
      setList(res.data || []);
    } catch (err) {
      console.error("Families load error:", err);
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />

        <main className="p-6 mt-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Families Registry</h1>
            <Link href="/phc/families/new" className="px-3 py-2 bg-blue-600 text-white rounded">+ Add Family</Link>
          </div>

          {loading ? <div>Loading families…</div> : (
            list.length === 0 ? <div className="text-gray-500">No families</div> : (
              <div className="space-y-3">
                {list.map(f => (
                  <div key={f.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                    <div>
                      <div className="font-medium">Family #{f.id} — {f.address}</div>
                      <div className="text-sm text-gray-500">
                        Members: {f.member_count} · Cases: {f.case_count} · Visits: {f.visit_count}
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Link href={`/phc/families/${f.id}`} className="text-blue-600">View</Link>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}

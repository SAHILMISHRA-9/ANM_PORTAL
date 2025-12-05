// pages/phc/families/[id].jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SidebarPHC from "../../../components/layout/SidebarPHC";
import Navbar from "../../../components/layout/Navbar";
import Link from "next/link";

export default function FamilyDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [fam, setFam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/phc/families/${id}`);
      setFam(res.data);
    } catch (err) {
      console.error("Family load error:", err);
      setFam(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-6">Loading…</div>;
  if (!fam) return <div className="p-6">Family not found.</div>;

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />

        <main className="p-6 mt-16 max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Family #{fam.id}</h1>
              <div className="text-sm text-gray-600">{fam.address}</div>
            </div>
            <div className="flex gap-2">
              <Link href="/phc/families" className="px-3 py-2 border rounded">Back</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">ASHA</div>
              <div className="font-medium">{fam.asha_id ? `ASHA #${fam.asha_id}` : "—"}</div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">ANM</div>
              <div className="font-medium">{fam.anm_id ? `ANM #${fam.anm_id}` : "—"}</div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">Area ID</div>
              <div className="font-medium">{fam.area_id || "—"}</div>
            </div>
          </div>

          <section className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-semibold mb-3">Members</h3>
            {(!fam.members || fam.members.length === 0) ? (
              <p className="text-gray-500">No members.</p>
            ) : (
              <div className="space-y-2">
                {fam.members.map(m => (
                  <div key={m.id} className="p-2 border rounded flex justify-between items-center">
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.age} yrs · {m.gender}</div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Link href={`/phc/members/${m.id}`} className="text-blue-600">View</Link>
                      <button onClick={() => router.push(`/phc/members/${m.id}`)} className="px-2 py-1 border rounded text-sm">Open</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-semibold mb-3">Visits</h3>
            {(!fam.visits || fam.visits.length === 0) ? (
              <p className="text-gray-500">No visits recorded.</p>
            ) : (
              <ul className="space-y-2">
                {fam.visits.map(v => (
                  <li key={v.id} className="p-2 border rounded">
                    <div className="text-sm">{v.date} · {v.purpose}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Cases</h3>
            {(!fam.cases || fam.cases.length === 0) ? (
              <p className="text-gray-500">No cases.</p>
            ) : (
              <ul className="space-y-2">
                {fam.cases.map(c => (
                  <li key={c.id} className="p-2 border rounded flex justify-between items-center">
                    <div>
                      <div className="font-medium">{c.category}</div>
                      <div className="text-xs text-gray-500">Risk: {c.risk_level}</div>
                    </div>

                    <div>
                      <Link href={`/phc/cases/${(c.category || "case").toLowerCase()}/${c.id}`} className="text-blue-600">Open Case</Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

        </main>
      </div>
    </div>
  );
}

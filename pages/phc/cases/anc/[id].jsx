// pages/phc/cases/anc/[id].jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";

export default function ANCDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [rec, setRec] = useState(null);
  const [anms, setAnms] = useState([]);
  const [ashas, setAshas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const [rRes, anRes, ashRes, areaRes] = await Promise.all([
        axios.get(`/api/phc/cases/${id}`),
        axios.get("/api/phc/workforce/anm-list"),
        axios.get("/api/phc/workforce/asha-list"),
        axios.get("/api/phc/areas")
      ]);
      setRec(rRes.data);
      setAnms(anRes.data || []);
      setAshas(ashRes.data || []);
      setAreas(areaRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveField(field, val) {
    try {
      const data = {};
      data[field] = val;
      await axios.put(`/api/phc/cases/${id}`, data);
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  }

  async function addNote() {
    if (!noteText.trim()) return;
    try {
      await axios.put(`/api/phc/cases/${id}`, { notes: { add: { text: noteText, by: "PHC" } }});
      setNoteText("");
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to add note");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!rec) return <div className="p-6">Case not found</div>;

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-6 mt-16 max-w-3xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{rec.patient_name}</h1>
              <p className="text-sm text-gray-500">Case ID: {rec.id} · Category: {rec.category}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/phc/cases/anc" className="px-3 py-2 border rounded">Back</Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mb-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">ANM</label>
                <select value={rec.anm_id || ""} onChange={(e) => saveField("anm_id", Number(e.target.value) || null)} className="w-full p-2 border rounded">
                  <option value="">Not assigned</option>
                  {anms.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm">ASHA</label>
                <select value={rec.asha_id || ""} onChange={(e) => saveField("asha_id", Number(e.target.value) || null)} className="w-full p-2 border rounded">
                  <option value="">Not assigned</option>
                  {ashas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm">Area</label>
                <select value={rec.area_id || ""} onChange={(e) => saveField("area_id", Number(e.target.value) || null)} className="w-full p-2 border rounded">
                  <option value="">—</option>
                  {areas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm">Risk Level</label>
                <select value={rec.risk_level || "low"} onChange={(e) => saveField("risk_level", e.target.value)} className="w-full p-2 border rounded">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold mb-2">Notes / Timeline</h3>
            <div className="space-y-2 mb-3">
              {rec.notes && rec.notes.length === 0 && <div className="text-gray-500">No notes yet.</div>}
              {rec.notes && rec.notes.map(n => (
                <div key={n.id} className="p-2 border rounded">
                  <div className="text-sm">{n.text}</div>
                  <div className="text-xs text-gray-500">{n.by} · {new Date(n.date).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} className="p-2 border rounded" placeholder="Add note"></textarea>
              <div className="flex gap-2">
                <button onClick={addNote} className="px-3 py-2 bg-blue-600 text-white rounded">Add Note</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Metadata</h3>
            <div className="text-sm text-gray-600">Created: {new Date(rec.created_at).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Updated: {new Date(rec.updated_at).toLocaleString()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

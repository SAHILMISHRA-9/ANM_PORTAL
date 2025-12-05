import { useState, useEffect } from "react";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NewPNC() {
  const router = useRouter();
  const [form, setForm] = useState({ patient_name: "", age: "", anm_id: "", asha_id: "", area_id: "", risk_level: "low" });
  const [anms, setAnms] = useState([]);
  const [ashas, setAshas] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function load() {
      const [aRes, anRes, ashRes] = await Promise.all([
        axios.get("/api/phc/areas"),
        axios.get("/api/phc/workforce/anm-list"),
        axios.get("/api/phc/workforce/asha-list")
      ]);
      setAreas(aRes.data || []);
      setAnms(anRes.data || []);
      setAshas(ashRes.data || []);
    }
    load();
  }, []);

  async function save() {
    if (!form.patient_name.trim()) return alert("Required");
    await axios.post("/api/phc/cases", { ...form, category: "PNC" });
    router.push("/phc/cases/pnc");
  }

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-6 mt-16 max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">New PNC Case</h1>

          <label>Patient Name</label>
          <input className="w-full p-2 border rounded mb-3" value={form.patient_name} onChange={e => setForm({...form, patient_name: e.target.value})} />

          <label>Age</label>
          <input className="w-full p-2 border rounded mb-3" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />

          <label>ANM</label>
          <select className="w-full p-2 border rounded mb-3" value={form.anm_id} onChange={e => setForm({...form, anm_id: e.target.value})}>
            <option value="">—</option>
            {anms.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <label>ASHA</label>
          <select className="w-full p-2 border rounded mb-3" value={form.asha_id} onChange={e => setForm({...form, asha_id: e.target.value})}>
            <option value="">—</option>
            {ashas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
          <Link href="/phc/cases/pnc" className="px-4 py-2 border rounded ml-2">Cancel</Link>
        </main>
      </div>
    </div>
  );
}

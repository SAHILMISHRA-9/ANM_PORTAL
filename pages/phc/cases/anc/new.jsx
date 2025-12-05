// pages/phc/cases/anc/new.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NewANC() {
  const router = useRouter();
  const [form, setForm] = useState({ patient_name: "", age: "", anm_id: "", asha_id: "", area_id: "", risk_level: "low" });
  const [anms, setAnms] = useState([]);
  const [ashas, setAshas] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function load() {
      const [aRes, anRes, ashRes] = await Promise.all([axios.get("/api/phc/areas"), axios.get("/api/phc/workforce/anm-list"), axios.get("/api/phc/workforce/asha-list")]);
      setAreas(aRes.data || []);
      setAnms(anRes.data || []);
      setAshas(ashRes.data || []);
    }
    load();
  }, []);

  async function save() {
    if (!form.patient_name.trim()) return alert("Patient name required");
    try {
      await axios.post("/api/phc/cases", { ...form, category: "ANC" });
      router.push("/phc/cases/anc");
    } catch (err) {
      console.error(err);
      alert("Failed to create");
    }
  }

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-6 mt-16 max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">New ANC Case</h1>
          <label className="block mb-1">Patient name</label>
          <input className="w-full p-2 border rounded mb-3" value={form.patient_name} onChange={e => setForm({...form, patient_name: e.target.value})} />
          <label className="block mb-1">Age</label>
          <input className="w-full p-2 border rounded mb-3" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
          <label className="block mb-1">ANM</label>
          <select className="w-full p-2 border rounded mb-3" value={form.anm_id} onChange={e => setForm({...form, anm_id: e.target.value})}>
            <option value="">—</option>
            {anms.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <label className="block mb-1">ASHA</label>
          <select className="w-full p-2 border rounded mb-3" value={form.asha_id} onChange={e => setForm({...form, asha_id: e.target.value})}>
            <option value="">—</option>
            {ashas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
            <Link href="/phc/cases/anc" className="px-4 py-2 border rounded">Cancel</Link>
          </div>
        </main>
      </div>
    </div>
  );
}

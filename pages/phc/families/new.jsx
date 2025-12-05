// pages/phc/families/new.jsx
import { useState } from "react";
import axios from "axios";
import SidebarPHC from "../../../components/layout/SidebarPHC";
import Navbar from "../../../components/layout/Navbar";
import { useRouter } from "next/router";

export default function AddFamilyPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [areaId, setAreaId] = useState("");
  const [ashaId, setAshaId] = useState("");
  const [anmId, setAnmId] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!address && !areaId) {
      alert("Address or Area ID is required");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.post("/api/phc/families/add", {
        address,
        area_id: Number(areaId),
        asha_id: ashaId ? Number(ashaId) : null,
        anm_id: anmId ? Number(anmId) : null
      });

      const fam = res.data;
      alert("Family created successfully");
      router.push(`/phc/families/${fam.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create family");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-6 mt-16 max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Add New Family</h1>

          <label className="block mb-2">Address</label>
          <input
            className="w-full border p-2 mb-4"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <label className="block mb-2">Area ID</label>
          <input
            className="w-full border p-2 mb-4"
            value={areaId}
            onChange={e => setAreaId(e.target.value)}
          />

          <label className="block mb-2">ASHA ID</label>
          <input
            className="w-full border p-2 mb-4"
            value={ashaId}
            onChange={e => setAshaId(e.target.value)}
          />

          <label className="block mb-2">ANM ID</label>
          <input
            className="w-full border p-2 mb-4"
            value={anmId}
            onChange={e => setAnmId(e.target.value)}
          />

          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {saving ? "Saving..." : "Create Family"}
          </button>
        </main>
      </div>
    </div>
  );
}

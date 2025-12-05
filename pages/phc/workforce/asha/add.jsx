// pages/phc/workforce/asha/add.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";

export default function AddASHA() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    supervisor_id: "",
    area_id: "",
  });

  const [anmList, setAnmList] = useState([]);
  const [areas, setAreas] = useState([]);
  const [saving, setSaving] = useState(false);

  // Load ANM list + Area list
  useEffect(() => {
    async function load() {
      try {
        const resAnm = await axios.get("/api/phc/workforce/anm-list");
        setAnmList(resAnm.data || []);

        const resAreas = await axios.get("/api/phc/workforce/summary");
        setAreas(resAreas.data?.areas || []);
      } catch (err) {
        console.error("Failed to load lists:", err);
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    // Basic validation
    if (!form.name || !form.phone) {
      alert("Name and Phone are required");
      return;
    }

    setSaving(true);

    try {
      await axios.post("/api/phc/workforce/asha-list", {
        ...form,
        supervisor_id: Number(form.supervisor_id),
        area_id: Number(form.area_id),
      });

      alert("ASHA added successfully!");
      window.location.href = "/phc/workforce/asha";
    } catch (err) {
      console.error(err);
      alert("Error adding ASHA worker");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />

      <div className="flex-1 ml-60">
        <Navbar />

        <main className="p-6 mt-16 max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Add ASHA Worker</h1>

          {/* NAME */}
          <label className="block mb-2 font-medium">Name</label>
          <input
            name="name"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter ASHA Name"
            onChange={handleChange}
          />

          {/* EMAIL */}
          <label className="block mb-2 font-medium">Email</label>
          <input
            name="email"
            className="w-full p-2 border rounded mb-4"
            placeholder="Email"
            onChange={handleChange}
          />

          {/* PHONE */}
          <label className="block mb-2 font-medium">Phone</label>
          <input
            name="phone"
            className="w-full p-2 border rounded mb-4"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          {/* SUPERVISOR ANM */}
          <label className="block mb-2 font-medium">Assign ANM (Supervisor)</label>
          <select
            name="supervisor_id"
            className="w-full p-2 border rounded mb-4"
            onChange={handleChange}
          >
            <option value="">Select ANM</option>
            {anmList.map((anm) => (
              <option key={anm.id} value={anm.id}>
                {anm.name}
              </option>
            ))}
          </select>

          {/* AREA SELECT */}
          <label className="block mb-2 font-medium">Assign Area</label>
          <select
            name="area_id"
            className="w-full p-2 border rounded mb-6"
            onChange={handleChange}
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>

          {/* SAVE BUTTON */}
          <button
            disabled={saving}
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving…" : "Save ASHA"}
          </button>

          <Link href="/phc/workforce/asha" className="ml-4 text-gray-700">
            Cancel
          </Link>
        </main>
      </div>
    </div>
  );
}

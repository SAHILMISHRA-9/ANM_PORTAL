import { useState } from "react";
import axios from "axios";
import SidebarPHC from "../../../../components/layout/SidebarPHC";
import Navbar from "../../../../components/layout/Navbar";
import Link from "next/link";

export default function AddANM() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hr_id: "",
    areas: [],
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setSaving(true);
    try {
      await axios.post("/api/phc/workforce/anm-list", form);
      alert("ANM added successfully!");
      window.location.href = "/phc/workforce/anm";
    } catch (err) {
      console.error(err);
      alert("Error adding ANM");
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
          <h1 className="text-2xl font-bold mb-4">Add ANM Worker</h1>

          {/* NAME */}
          <label className="block mb-2 font-medium">Name</label>
          <input
            name="name"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter ANM Name"
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
            placeholder="Phone"
            onChange={handleChange}
          />

          {/* HR ID */}
          <label className="block mb-2 font-medium">HR ID</label>
          <input
            name="hr_id"
            className="w-full p-2 border rounded mb-4"
            placeholder="ANM HR ID"
            onChange={handleChange}
          />

          {/* AREAS (comma separated for now) */}
          <label className="block mb-2 font-medium">Areas (comma separated)</label>
          <input
            className="w-full p-2 border rounded mb-6"
            placeholder="1, 2, 3"
            onChange={(e) => {
              const list = e.target.value
                .split(",")
                .map((x) => Number(x.trim()))
                .filter((x) => x > 0);
              setForm({ ...form, areas: list });
            }}
          />

          {/* SAVE BUTTON */}
          <button
            disabled={saving}
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving…" : "Save ANM"}
          </button>

          <Link href="/phc/workforce/anm" className="ml-4 text-gray-700">
            Cancel
          </Link>
        </main>
      </div>
    </div>
  );
}

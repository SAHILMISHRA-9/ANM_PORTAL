// pages/phc/tasks/create.jsx
import { useState } from "react";
import axios from "axios";
import SidebarPHC from "../../components/layout/SidebarPHC";
import Navbar from "../../components/layout/Navbar";
import { useRouter } from "next/router";

export default function CreateTaskPage() {
  const router = useRouter();
  const [surveyId, setSurveyId] = useState("");
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  async function create() {
    if (!surveyId) return alert("Provide survey id");
    setLoading(true);
    try {
      const res = await axios.post("/api/phc/tasks/create", { survey_id: Number(surveyId), count: Number(count) });
      alert(`Created ${res.data.createdCount} tasks`);
      // optional: go to survey page
      router.push(`/phc/surveys/${surveyId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create tasks");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-6 mt-16 max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Create Tasks (test)</h1>
          <label className="block mb-2">Survey ID</label>
          <input value={surveyId} onChange={e => setSurveyId(e.target.value)} className="w-full border p-2 mb-4" />

          <label className="block mb-2">Count</label>
          <input type="number" value={count} onChange={e => setCount(e.target.value)} className="w-32 border p-2 mb-4" />

          <div className="flex gap-3">
            <button onClick={create} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Creating..." : "Create"}</button>
          </div>
        </main>
      </div>
    </div>
  );
}

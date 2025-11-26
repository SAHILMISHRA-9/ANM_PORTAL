import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import Navbar from "../../../components/layout/Navbar";
import axios from "axios";
import Link from "next/link";

export default function FamilyDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [family, setFamily] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await axios.get("/api/family/list");
        const f = res.data.find((x) => x.id == id);
        setFamily(f);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [id]);

  if (!family)
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 p-6">Loading...</div>
      </div>
    );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">{family.familyHead} (Family)</h1>
          <p className="text-gray-600">Village: {family.village}</p>

          {/* Members */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Members</h2>

            <div className="space-y-3">
              {family.members.map((m) => (
                <Link
                  key={m.id}
                  href={`/dashboard/family/member/${m.id}`}
                  className="block p-3 border rounded hover:bg-gray-50"
                >
                  <p className="text-lg font-medium">{m.name}</p>
                  <p className="text-sm text-gray-600">
                    {m.age} years • {m.gender}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

import Link from "next/link";
import SidebarPHC from "../../../components/layout/SidebarPHC.jsx";
import Navbar from "../../../components/layout/Navbar";

export default function WorkforceHome() {
  return (
    <div className="flex min-h-screen">
      <SidebarPHC />
      <div className="flex-1 ml-64">
        <Navbar role="phc" />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Workforce Management</h1>
          <p className="text-gray-600 mb-4">Manage ANM & ASHA field workforce.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link href="/phc/workforce/anm" className="block p-6 bg-white shadow rounded hover:bg-gray-50">
              <h2 className="text-xl font-semibold">ANM Management</h2>
              <p className="text-gray-600 text-sm mt-1">Add, edit & supervise ANM workers.</p>
            </Link>

            <Link href="/phc/workforce/asha" className="block p-6 bg-white shadow rounded hover:bg-gray-50">
              <h2 className="text-xl font-semibold">ASHA Management</h2>
              <p className="text-gray-600 text-sm mt-1">Assign ANM/Area & track performance.</p>
            </Link>

          </div>
        </main>
      </div>
    </div>
  );
}

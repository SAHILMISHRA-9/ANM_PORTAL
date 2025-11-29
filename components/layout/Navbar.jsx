import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const r = localStorage.getItem("role");
    if (r) setRole(r);
  }, []);

  return (
    <header className="bg-white shadow p-4 flex items-center justify-end">

      {/* USER / ROLE DISPLAY */}
      <div className="mr-4 text-sm font-semibold text-gray-700">
        {role ? role : "GUEST"}
      </div>

      {/* LOGOUT */}
      <button
        onClick={()=>{
          localStorage.clear();
          router.push("/login");
        }}
        className="bg-red-500 text-white px-3 py-1 rounded-md"
      >
        Logout
      </button>
    </header>
  );
}

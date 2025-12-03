// components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const r = localStorage.getItem("role");
    if (r) setRole(r);
  }, []);

  const handleLogout = () => {
    // 🔥 Remove localStorage auth
    localStorage.removeItem("anm_token");
    localStorage.removeItem("role");

    // 🔥 Remove cookies (VERY IMPORTANT)
    document.cookie = "auth_token=; Max-Age=0; path=/;";
    document.cookie = "auth_role=; Max-Age=0; path=/;";

    // 🔥 Hard redirect (bypass router)
    window.location.replace("/login");
  };

  return (
    <header
      className="
        bg-white shadow p-4 flex items-center justify-end
        fixed top-0 right-0 left-64 z-50
      "
    >
      <div className="mr-4 text-sm font-semibold text-gray-700">
        {role ? role : "GUEST"}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded-md"
      >
        Logout
      </button>
    </header>
  );
}

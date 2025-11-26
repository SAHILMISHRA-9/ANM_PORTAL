import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs ONLY on client-side → avoids hydration mismatch
    const data = localStorage.getItem("anm_user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("anm_token");
    localStorage.removeItem("anm_user");
    router.push("/login");
  };

  return (
    <header className="bg-white shadow p-4 flex items-center justify-end">
      <div className="mr-4 text-sm">
        {user ? user.name : "ANM User"}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
}

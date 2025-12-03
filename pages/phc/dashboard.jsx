import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PHCDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(stored);
    if (parsed.role !== "phc") {
      router.push("/login");
      return;
    }

    setUser(parsed);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return <p style={{ padding: 40 }}>Loading PHC dashboard...</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>PHC Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Role: <b>{user.role}</b></p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: 10,
          background: "red",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: 4,
        }}
      >
        Logout
      </button>
    </div>
  );
}

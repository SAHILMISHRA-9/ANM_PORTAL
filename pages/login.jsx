import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  // ✅ SAFE LOGIN CHECK → prevents redirect loop
  useEffect(() => {
    const token = localStorage.getItem("anm_token");
    const role = localStorage.getItem("role");

    if (token && role === "anm") {
      window.location.replace("/dashboard");
    }
  }, []);

  const [role, setRole] = useState("anm");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await axios
      .post("/api/auth/login", { role, mobile, password })
      .catch(() => null);

    if (!res || !res.data.success) return alert("Invalid credentials");

    const { token, user } = res.data;

    // 🔥 Store tokens properly
    localStorage.setItem("anm_token", token);
    localStorage.setItem("role", role);

    // 🔥 Set cookies too
    document.cookie = `auth_token=${token}; path=/;`;
    document.cookie = `auth_role=${role}; path=/;`;

    // 🔥 Hard redirect
    window.location.href = "/dashboard";
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4 text-center">Login Portal</h2>

        <label className="text-sm">Select Role</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 mb-3"
        >
          <option value="anm">ANM</option>
          <option value="phc">PHC Officer</option>
          <option value="doctor">Doctor</option>
        </select>

        <input
          className="w-full p-2 border mb-3"
          placeholder="Mobile No"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

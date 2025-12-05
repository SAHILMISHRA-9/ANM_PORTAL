import React from "react";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_role");
    // clear cookies if used
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-gray-600">PHC</div>
        <div>
          <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </div>
    </div>
  );
}

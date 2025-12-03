// pages/_app.js
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("anm_token");
    const role = localStorage.getItem("role");

    const publicRoutes = ["/login"];

    // 🚀 Allow login page freely
    if (publicRoutes.includes(router.pathname)) {
      setReady(true);
      return;
    }

    // 🚀 If token missing → send to login
    if (!token) {
      window.location.replace("/login");
      return;
    }

    // 🚀 Token exists → allow dashboard or protected page
    setReady(true);
  }, [router.pathname]);

  // Prevent flicker/loop
  if (!ready) return null;

  return <Component {...pageProps} />;
}

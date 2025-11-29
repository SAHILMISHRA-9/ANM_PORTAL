import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;
  const role  = req.cookies.get("auth_role")?.value;
  const path  = req.nextUrl.pathname;

  // 🔓 Allow login page if no token
  if (path === "/login") {
    if (token && role) return redirectRole(req, role);
    return NextResponse.next();
  }

  // 🔐 Protected
  if (!token || !role) return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

function redirectRole(req, role) {
  let route = "/login";
  if (role === "anm") route = "/dashboard";
  if (role === "phc") route = "/phc-dashboard";
  if (role === "doctor") route = "/doctor-dashboard";
  return NextResponse.redirect(new URL(route, req.url));
}

export const config = { matcher:["/dashboard/:path*","/phc-dashboard/:path*","/doctor-dashboard/:path*","/login"] };

import Link from "next/link";
import { useRouter } from "next/router";

export default function PHCSidebar() {
  const router = useRouter();

  const menu = [
    { label: "Dashboard", href: "/phc" },
    { label: "Workforce Management", href: "/phc/workforce" },
    { label: "Area Management", href: "/phc/areas" },
    { label: "Surveys & Campaigns", href: "/phc/surveys" },
    { label: "Case Monitoring", href: "/phc/cases" },
    { label: "High-Risk Board", href: "/phc/high-risk" },
    { label: "Family & Members", href: "/phc/families" },
    { label: "Visit & Logs", href: "/phc/visits" },
    { label: "Task Management", href: "/phc/tasks" },
    { label: "Reports & Exports", href: "/phc/reports" },
    { label: "Settings", href: "/phc/settings" },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <aside className="w-64 bg-white shadow h-screen p-5 fixed border-r border-gray-200">
      {/* PHC Logo / Title */}
      <div className="mb-8">
        <h1 className="font-bold text-xl">PHC Admin</h1>
        <p className="text-xs text-gray-500">Primary Health Centre</p>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1">
        {menu.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`block px-4 py-2 rounded-lg text-sm ${
              isActive(item.href)
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

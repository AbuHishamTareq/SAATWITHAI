import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ShoppingBag,
  CalendarDays,
  CreditCard,
  BarChart3,
} from "lucide-react";

/**
 * Sidebar navigation component.
 */
export default function Sidebar() {
  const { t } = useTranslation();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: t("nav.dashboard") },
    { to: "/users", icon: Users, label: t("nav.users") },
    { to: "/providers", icon: Briefcase, label: t("nav.providers") },
    { to: "/services", icon: ShoppingBag, label: t("nav.services") },
    { to: "/bookings", icon: CalendarDays, label: t("nav.bookings") },
    { to: "/payments", icon: CreditCard, label: t("nav.payments") },
    { to: "/reports", icon: BarChart3, label: t("nav.reports") },
  ] as const;

  return (
    <aside className="w-64 min-h-screen bg-[#3E4C74] dark:bg-[#2A3555] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <h1 className="text-xl font-bold">{t("common.appName")} Admin</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

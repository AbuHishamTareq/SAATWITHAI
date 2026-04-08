import { LogOut, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import ThemeToggle from "../ui/ThemeToggle";

/**
 * Top header bar with user info, language switcher, theme toggle and logout.
 */
export default function Header() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between transition-colors">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        SAAT CRM — {t("common.platform")}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <User size={18} />
          <span className="text-sm">{user?.name ?? "Admin"}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          <LogOut size={16} />
          {t("common.logout")}
        </button>
      </div>
    </header>
  );
}

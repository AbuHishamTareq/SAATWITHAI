import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Top header bar with user info and logout.
 */
export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        SAAT CRM — Service Booking Platform
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <User size={18} />
          <span className="text-sm">{user?.name || 'Admin'}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}

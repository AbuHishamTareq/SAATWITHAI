import { useQuery } from '@tanstack/react-query';
import { Users, Briefcase, CalendarDays, CreditCard } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { adminService } from '../../services/adminService';

interface StatCard {
  key: string;
  label: string;
  icon: typeof Users;
  color: string;
}

interface ChartDataPoint {
  name: string;
  bookings: number;
  revenue: number;
}

const statsCards: StatCard[] = [
  { key: 'users', label: 'Total Users', icon: Users, color: 'bg-blue-500' },
  { key: 'providers', label: 'Total Providers', icon: Briefcase, color: 'bg-green-500' },
  { key: 'bookings', label: 'Total Bookings', icon: CalendarDays, color: 'bg-yellow-500' },
  { key: 'revenue', label: 'Total Revenue', icon: CreditCard, color: 'bg-purple-500' },
];

const chartData: ChartDataPoint[] = [
  { name: 'Mon', bookings: 12, revenue: 240 },
  { name: 'Tue', bookings: 19, revenue: 380 },
  { name: 'Wed', bookings: 8, revenue: 160 },
  { name: 'Thu', bookings: 15, revenue: 300 },
  { name: 'Fri', bookings: 22, revenue: 440 },
  { name: 'Sat', bookings: 28, revenue: 560 },
  { name: 'Sun', bookings: 10, revenue: 200 },
];

/**
 * Admin dashboard with stats and charts.
 */
export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminService.getStats(),
    select: (res) => res.data,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <div className={`p-3 rounded-lg text-white ${color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? '—' : stats?.[key as keyof typeof stats] ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bookings This Week</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#214D8D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue This Week</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#D4A87D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

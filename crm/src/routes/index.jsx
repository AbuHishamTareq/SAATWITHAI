import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import PlaceholderPage from '../components/ui/PlaceholderPage';
import AdminLayout from '../components/layout/AdminLayout';
import { authService } from '../services/authService';

/**
 * Protected route wrapper — redirects to /login if not authenticated.
 */
function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
}

/**
 * Application router.
 */
export const router = createBrowserRouter([
  // Public
  { path: '/login', element: <LoginPage /> },

  // Protected admin routes
  {
    path: '/',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
  },
  {
    path: '/users',
    element: <ProtectedRoute><PlaceholderPage title="User Management" /></ProtectedRoute>,
  },
  {
    path: '/providers',
    element: <ProtectedRoute><PlaceholderPage title="Provider Management" /></ProtectedRoute>,
  },
  {
    path: '/services',
    element: <ProtectedRoute><PlaceholderPage title="Service Management" /></ProtectedRoute>,
  },
  {
    path: '/bookings',
    element: <ProtectedRoute><PlaceholderPage title="Booking Management" /></ProtectedRoute>,
  },
  {
    path: '/payments',
    element: <ProtectedRoute><PlaceholderPage title="Payment Management" /></ProtectedRoute>,
  },
  {
    path: '/reports',
    element: <ProtectedRoute><PlaceholderPage title="Reports & Analytics" /></ProtectedRoute>,
  },

  // Catch-all
  { path: '*', element: <Navigate to="/" replace /> },
]);

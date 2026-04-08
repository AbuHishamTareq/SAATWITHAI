import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PlaceholderPage from "../components/ui/PlaceholderPage";
import AdminLayout from "../components/layout/AdminLayout";
import { authService } from "../services/authService";
import type { ReactNode } from "react";

/**
 * Protected route wrapper — redirects to /login if not authenticated.
 */
function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
}

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <PlaceholderPage title="User Management" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/providers",
    element: (
      <ProtectedRoute>
        <PlaceholderPage title="Provider Management" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute>
        <PlaceholderPage title="Service Management" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookings",
    element: (
      <ProtectedRoute>
        <PlaceholderPage title="Booking Management" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payments",
    element: (
      <ProtectedRoute>
        <PlaceholderPage title="Payment Management" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <PlaceholderPage title="Reports & Analytics" />
      </ProtectedRoute>
    ),
  },
];

/**
 * Application router.
 */
export const router = createBrowserRouter([
  // Public
  { path: "/login", element: <LoginPage /> },
  // Protected admin routes
  ...protectedRoutes,
  // Catch-all
  { path: "*", element: <Navigate to="/" replace /> },
]);

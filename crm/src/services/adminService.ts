import api from './api';
import type {
  User,
  Provider,
  Service,
  Booking,
  Payment,
  DashboardStats,
  BookingStatus,
} from '../types';

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

/**
 * Admin management service — users, providers, services, bookings, payments.
 */
export const adminService = {
  // ── Users ──
  getUsers: (params?: Record<string, unknown>) =>
    api.get<PaginatedResponse<User>>('/admin/users', { params }),
  getUser: (id: number) => api.get<User>(`/admin/users/${id}`),
  createUser: (data: Record<string, unknown>) => api.post<User>('/admin/users', data),
  updateUser: (id: number, data: Record<string, unknown>) =>
    api.put<User>(`/admin/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),
  assignRole: (userId: number, role: string) =>
    api.post(`/admin/users/${userId}/role`, { role }),

  // ── Providers ──
  getProviders: (params?: Record<string, unknown>) =>
    api.get<PaginatedResponse<Provider>>('/admin/providers', { params }),
  getProvider: (id: number) => api.get<Provider>(`/admin/providers/${id}`),

  // ── Services ──
  getServices: (params?: Record<string, unknown>) =>
    api.get<PaginatedResponse<Service>>('/admin/services', { params }),
  getService: (id: number) => api.get<Service>(`/admin/services/${id}`),
  deleteService: (id: number) => api.delete(`/admin/services/${id}`),

  // ── Bookings ──
  getBookings: (params?: Record<string, unknown>) =>
    api.get<PaginatedResponse<Booking>>('/admin/bookings', { params }),
  getBooking: (id: number) => api.get<Booking>(`/admin/bookings/${id}`),
  updateBookingStatus: (id: number, status: BookingStatus) =>
    api.put(`/admin/bookings/${id}/status`, { status }),

  // ── Payments ──
  getPayments: (params?: Record<string, unknown>) =>
    api.get<PaginatedResponse<Payment>>('/admin/payments', { params }),
  getPayment: (id: number) => api.get<Payment>(`/admin/payments/${id}`),
  refundPayment: (id: number) => api.post(`/admin/payments/${id}/refund`),

  // ── Dashboard Stats ──
  getStats: () => api.get<DashboardStats>('/admin/stats'),
};

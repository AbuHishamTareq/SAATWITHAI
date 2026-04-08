import api from './api';

/**
 * Admin management service — users, providers, services, bookings, payments.
 */
export const adminService = {
  // ── Users ──
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  assignRole: (userId, role) => api.post(`/admin/users/${userId}/role`, { role }),

  // ── Providers ──
  getProviders: (params) => api.get('/admin/providers', { params }),
  getProvider: (id) => api.get(`/admin/providers/${id}`),

  // ── Services ──
  getServices: (params) => api.get('/admin/services', { params }),
  getService: (id) => api.get(`/admin/services/${id}`),
  deleteService: (id) => api.delete(`/admin/services/${id}`),

  // ── Bookings ──
  getBookings: (params) => api.get('/admin/bookings', { params }),
  getBooking: (id) => api.get(`/admin/bookings/${id}`),
  updateBookingStatus: (id, status) => api.put(`/admin/bookings/${id}/status`, { status }),

  // ── Payments ──
  getPayments: (params) => api.get('/admin/payments', { params }),
  getPayment: (id) => api.get(`/admin/payments/${id}`),
  refundPayment: (id) => api.post(`/admin/payments/${id}/refund`),

  // ── Dashboard Stats ──
  getStats: () => api.get('/admin/stats'),
};

/**
 * Shared TypeScript types for the CRM application.
 */

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser extends User {
  email: string;
  role: 'admin';
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  provider_id: number;
  category_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  customer_id: number;
  provider_id: number;
  service_id: number;
  status: BookingStatus;
  scheduled_at: string;
  paid_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  method: 'online' | 'wallet';
  status: PaymentStatus;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Provider {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  rating: number;
  total_bookings: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  users: number;
  providers: number;
  bookings: number;
  revenue: number;
  recent_bookings: Booking[];
  recent_payments: Payment[];
}

/**
 * Standardized API response envelope.
 */
export interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data: T;
}

/**
 * Standardized API error response envelope.
 */
export interface ApiErrorResponse {
  status: false;
  message: string;
  errors: Record<string, string[]>;
}

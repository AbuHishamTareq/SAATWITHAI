import api from './api';
import { TOKEN_KEY } from '../constants';
import type { AdminUser, ApiResponse } from '../types';

interface LoginResponse {
  token: string;
  user: AdminUser;
}

/**
 * Admin authentication service.
 */
export const authService = {
  /**
   * Login with email and password.
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/admin/login', {
      email,
      password,
    });
    const { token, user } = response.data.data;
    localStorage.setItem(TOKEN_KEY, token);
    return { token, user };
  },

  /**
   * Logout and clear stored token.
   */
  async logout(): Promise<void> {
    try {
      await api.post('/admin/logout');
    } finally {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  /**
   * Get the currently authenticated admin user.
   */
  async getMe(): Promise<AdminUser> {
    const response = await api.get<ApiResponse<AdminUser>>('/admin/me');
    return response.data.data;
  },

  /**
   * Check if admin is authenticated.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

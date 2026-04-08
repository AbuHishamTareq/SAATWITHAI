import api from './api';
import { TOKEN_KEY } from '../constants';

/**
 * Admin authentication service.
 */
export const authService = {
  /**
   * Login with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password) {
    const response = await api.post('/admin/login', { email, password });
    const { token, user } = response.data.data;
    localStorage.setItem(TOKEN_KEY, token);
    return { token, user };
  },

  /**
   * Logout and clear stored token.
   */
  async logout() {
    try {
      await api.post('/admin/logout');
    } finally {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  /**
   * Get the currently authenticated admin user.
   * @returns {Promise<object>}
   */
  async getMe() {
    const response = await api.get('/admin/me');
    return response.data.data;
  },

  /**
   * Check if admin is authenticated.
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

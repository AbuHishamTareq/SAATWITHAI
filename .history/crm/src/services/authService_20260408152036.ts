import api from "./api";
import { TOKEN_KEY, DEMO_CREDENTIALS } from "../constants";
import type { AdminUser, ApiResponse } from "../types";

interface LoginResponse {
  token: string;
  user: AdminUser;
}

/**
 * Admin authentication service with demo mode fallback.
 */
export const authService = {
  /**
   * Login with email and password.
   * Falls back to demo mode when backend is unreachable.
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>(
        "/admin/login",
        {
          email,
          password,
        },
      );
      const { token, user } = response.data.data;
      localStorage.setItem(TOKEN_KEY, token);
      return { token, user };
    } catch {
      // Backend unreachable — fall back to demo credentials
      if (
        email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() &&
        password === DEMO_CREDENTIALS.password
      ) {
        const demoToken = "demo-token-" + Date.now();
        const demoUser: AdminUser = {
          id: 1,
          name: "Demo Admin",
          email: DEMO_CREDENTIALS.email,
          phone: "+966500000000",
          role: "admin",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        localStorage.setItem(TOKEN_KEY, demoToken);
        return { token: demoToken, user: demoUser };
      }
      throw new Error("Invalid email or password");
    }
  },

  /**
   * Logout and clear stored token.
   */
  async logout(): Promise<void> {
    try {
      await api.post("/admin/logout");
    } catch {
      // Backend may be unreachable — clear token anyway
    } finally {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  /**
   * Get the currently authenticated admin user.
   */
  async getMe(): Promise<AdminUser> {
    try {
      const response = await api.get<ApiResponse<AdminUser>>("/admin/me");
      return response.data.data;
    } catch {
      // Demo mode — return cached user
      const stored = localStorage.getItem(TOKEN_KEY);
      if (stored?.startsWith("demo-token-")) {
        return {
          id: 1,
          name: "Demo Admin",
          email: DEMO_CREDENTIALS.email,
          phone: "+966500000000",
          role: "admin",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      throw new Error("Not authenticated");
    }
  },

  /**
   * Check if admin is authenticated.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

/// API base URL and configuration constants.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
export const TOKEN_KEY = "admin_token";
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Demo credentials — used for quick login when backend is not ready.
 */
export const DEMO_CREDENTIALS = {
  email: "tareq.abd@hotmail.com",
  password: "admin123",
} as const;

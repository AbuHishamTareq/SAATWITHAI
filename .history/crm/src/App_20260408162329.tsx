import { useEffect, type ReactNode } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { router } from "./routes";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { LocaleProvider } from "./hooks/useLocale";
import "./i18n";

// Initialize Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

/**
 * Auth initializer — checks auth status on app mount.
 */
function AuthInitializer({ children }: { children: ReactNode }) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return children;
}

/**
 * Root application component.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocaleProvider>
          <AuthInitializer>
            <RouterProvider router={router} />
          </AuthInitializer>
        </LocaleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

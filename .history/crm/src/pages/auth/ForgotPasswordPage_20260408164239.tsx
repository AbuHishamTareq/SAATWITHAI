import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import bgImage from "../../assets/images/service-workers-bg.jpg";

/**
 * Forgot password page — matches login page design language.
 */
export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: wire to backend password reset endpoint
      // await api.post('/admin/password/email', { email });
      setSubmitted(true);
    } catch {
      setError(t("forgotPassword.sendError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/60" />

      {/* Top branding */}
      <div className="relative z-10 flex flex-col items-center pt-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {t("common.appName")}
            </h1>
            <p className="text-xs text-white/70 -mt-0.5">
              {t("common.crmSystem")}
            </p>
          </div>
        </div>
        <p className="text-white/80 text-lg font-medium">
          {t("common.platform")}
        </p>
      </div>

      {/* Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-scale-in">
          {submitted ? (
            <div className="text-center animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("forgotPassword.checkEmail")}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t("forgotPassword.resetLinkSent")} <strong>{email}</strong>
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
              >
                <ArrowLeft size={16} />
                {t("forgotPassword.backToLogin")}
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("forgotPassword.title")}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {t("forgotPassword.subtitle")}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 stagger-children"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("auth.email")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all"
                      placeholder={t("auth.emailPlaceholder")}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 text-center bg-red-50 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {loading
                    ? t("forgotPassword.sending")
                    : t("forgotPassword.sendResetLink")}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
                >
                  <ArrowLeft size={16} />
                  {t("forgotPassword.backToLogin")}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-6">
        <p className="text-sm text-white/60">{t("footer.copyright")}</p>
      </div>
    </div>
  );
}

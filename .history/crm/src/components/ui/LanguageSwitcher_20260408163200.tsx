import { Globe } from "lucide-react";
import { useLocale } from "../../hooks/useLocale";

/**
 * Language switcher — toggles between English and Arabic with RTL support.
 */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span>{locale === "ar" ? "العربية" : "English"}</span>
      </button>
      <div className="absolute right-0 mt-1 hidden group-hover:block before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:bg-transparent bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
        <button
          onClick={() => setLocale("en")}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
            locale === "en" ? "text-purple-600 font-medium" : "text-gray-700"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLocale("ar")}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
            locale === "ar" ? "text-purple-600 font-medium" : "text-gray-700"
          }`}
        >
          العربية
        </button>
      </div>
    </div>
  );
}

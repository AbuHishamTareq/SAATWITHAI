import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

const RTL_LANGS = ["ar"] as const;

interface LocaleContextType {
  locale: string;
  isRTL: boolean;
  setLocale: (lang: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  isRTL: false,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";
  const isRTL = RTL_LANGS.includes(locale as (typeof RTL_LANGS)[number]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale, isRTL]);

  const setLocale = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LocaleContext.Provider value={{ locale, isRTL, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

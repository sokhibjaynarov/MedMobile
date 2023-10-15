// ** I18n Imports
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ** Languages Imports
const en = new URL("../../assets/data/locales/en.json", import.meta.url).href;
const uz = new URL("../../assets/data/locales/uz.json", import.meta.url).href;
const ru = new URL("../../assets/data/locales/ru.json", import.meta.url).href;

const languages = { en, uz, ru };

i18n

  // Enables the i18next backend
  .use(Backend)

  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: "uz",
    backend: {
      /* translation file path */
      loadPath: (lng) => languages[lng],
    },
    fallbackLng: "uz",
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;

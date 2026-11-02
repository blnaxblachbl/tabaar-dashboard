import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";

import enTranslations from "@/libs/i18n/locales/en.json";
import ruTranslations from "@/libs/i18n/locales/ru.json";
import { Language } from "@/libs/i18n/types";
import { SAVED_LANGUAGE_KEY } from "@/utils/constants";

const currentLang =
  localStorage.getItem(SAVED_LANGUAGE_KEY) ||
  getBrowserLanguage() ||
  Language.ENGLISH;
dayjs.locale(currentLang === "zh" ? "zh-cn" : currentLang);

i18n.use(initReactI18next).init({
  resources: {
    [Language.ENGLISH]: { translation: enTranslations },
    [Language.RUSSIAN]: { translation: ruTranslations },
  },
  lng: currentLang,
  fallbackLng: Language.ENGLISH,
  interpolation: {
    escapeValue: false,
  },
});

function getBrowserLanguage() {
  const browserLanguage = navigator.language?.replace(
    /-[A-Z]+/gm,
    "",
  ) as Language;
  if (browserLanguage && Object.values(Language).includes(browserLanguage)) {
    return browserLanguage;
  }
  return null;
}

export default i18n;

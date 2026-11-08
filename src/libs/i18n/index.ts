import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/es";
import "dayjs/locale/it";
import "dayjs/locale/tr";
import "dayjs/locale/zh-cn";
import "dayjs/locale/hi";
import "dayjs/locale/pl";
import "dayjs/locale/ko";
import "dayjs/locale/fr";
import "dayjs/locale/ar";

import arTranslations from "@/libs/i18n/locales/ar.json";
import enTranslations from "@/libs/i18n/locales/en.json";
import esTranslations from "@/libs/i18n/locales/es.json";
import frTranslations from "@/libs/i18n/locales/fr.json";
import hiTranslations from "@/libs/i18n/locales/hi.json";
import itTranslations from "@/libs/i18n/locales/it.json";
import koTranslations from "@/libs/i18n/locales/ko.json";
import plTranslations from "@/libs/i18n/locales/pl.json";
import ruTranslations from "@/libs/i18n/locales/ru.json";
import trTranslations from "@/libs/i18n/locales/tr.json";
import zhTranslations from "@/libs/i18n/locales/zh.json";
import { Language } from "@/libs/i18n/types";
import { SAVED_LANGUAGE_KEY } from "@/utils/constants";

const currentLang =
  localStorage.getItem(SAVED_LANGUAGE_KEY) ||
  getBrowserLanguage() ||
  Language.ENGLISH;
dayjs.locale(currentLang === "zh" ? "zh-cn" : currentLang);

document.dir = currentLang === Language.ARABIC ? "rtl" : "ltf";

i18n.use(initReactI18next).init({
  resources: {
    [Language.ARABIC]: { translation: arTranslations },
    [Language.ENGLISH]: { translation: enTranslations },
    [Language.SPANISH]: { translation: esTranslations },
    [Language.FRENCH]: { translation: frTranslations },
    [Language.HINDI]: { translation: hiTranslations },
    [Language.ITALIAN]: { translation: itTranslations },
    [Language.KOREAN]: { translation: koTranslations },
    [Language.POLISH]: { translation: plTranslations },
    [Language.RUSSIAN]: { translation: ruTranslations },
    [Language.TURKISH]: { translation: trTranslations },
    [Language.CHINESE]: { translation: zhTranslations },
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

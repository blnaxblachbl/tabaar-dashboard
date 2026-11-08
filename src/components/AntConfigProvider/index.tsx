import type { PropsWithChildren } from "react";
import { ConfigProvider, theme } from "antd";
import { useTranslation } from "react-i18next";
import type { Locale } from "antd/lib/locale";

import arLocale from "antd/locale/ar_EG";
import enLocale from "antd/locale/en_US";
import frLocale from "antd/locale/fr_FR";
import hiLocale from "antd/locale/hi_IN";
import itLocale from "antd/locale/it_IT";
import koLocale from "antd/locale/ko_KR";
import plLocale from "antd/locale/pl_PL";
import ruLocale from "antd/locale/ru_RU";
import trLocale from "antd/locale/tr_TR";
import zhLocale from "antd/locale/zh_CN";
import esLocale from "antd/locale/es_ES";

import { Language } from "@/libs/i18n/types";

const artLocales: Record<Language, Locale> = {
  [Language.ARABIC]: arLocale,
  [Language.ENGLISH]: enLocale,
  [Language.SPANISH]: esLocale,
  [Language.FRENCH]: frLocale,
  [Language.HINDI]: hiLocale,
  [Language.ITALIAN]: itLocale,
  [Language.KOREAN]: koLocale,
  [Language.POLISH]: plLocale,
  [Language.TURKISH]: trLocale,
  [Language.RUSSIAN]: ruLocale,
  [Language.CHINESE]: zhLocale,
};

export function AntConfigProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Menu: {
            itemSelectedColor: undefined,
          },
        },
      }}
      locale={artLocales[i18n.language as Language]}
    >
      {children}
    </ConfigProvider>
  );
}

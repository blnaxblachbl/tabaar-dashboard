import type { PropsWithChildren } from "react";
import { ConfigProvider, theme } from "antd";
import { useTranslation } from "react-i18next";
import enLocale from "antd/locale/en_US";
import ruLocale from "antd/locale/ru_RU";

import { Language } from "@/libs/i18n/types";

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
      locale={i18n.language === Language.ENGLISH ? enLocale : ruLocale}
    >
      {children}
    </ConfigProvider>
  );
}

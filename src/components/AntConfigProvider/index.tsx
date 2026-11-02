import { ConfigProvider, theme } from "antd";
import { useTranslation } from "react-i18next";
import type { PropsWithChildren } from "react";

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
      locale={{
        locale: i18n.language,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

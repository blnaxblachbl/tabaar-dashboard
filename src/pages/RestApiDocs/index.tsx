import { Divider, theme } from "antd";
import SwaggerUI from "swagger-ui-react";
import { useTranslation } from "react-i18next";
import "swagger-ui-react/swagger-ui.css";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";

export default function RestApiDocsPage() {
  const { token } = theme.useToken();
  const { t } = useTranslation("", {
    keyPrefix: "pages.rest-docs",
  });

  return (
    <PageLayout>
      <Title title={t("title")} />
      <Divider />
      <div
        style={{
          backgroundColor: token.colorBgSolid,
        }}
      >
        <SwaggerUI url="/api/swagger" />
      </div>
    </PageLayout>
  );
}

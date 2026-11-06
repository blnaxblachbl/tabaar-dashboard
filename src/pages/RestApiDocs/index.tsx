import { theme } from "antd";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { PageLayout } from "@/components/PageLayout";

export default function RestApiDocsPage() {
  const { token } = theme.useToken();

  return (
    <PageLayout
      className="p-0! max-w-full min-h-screen"
      style={{
        backgroundColor: token.colorBgSolid,
      }}
    >
      <SwaggerUI url="/api/swagger" />
    </PageLayout>
  );
}

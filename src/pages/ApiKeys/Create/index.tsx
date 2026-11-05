import { Divider } from "antd";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { ApiKeyForm } from "@/components/AoiKeyForm";
import { useTranslation } from "react-i18next";

export default function CreateApiKeyPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.create-api-key",
  });

  return (
    <PageLayout>
      <Title title={t("title")} />
      <Divider />
      <div className="max-w-md mx-auto">
        <ApiKeyForm />
      </div>
    </PageLayout>
  );
}

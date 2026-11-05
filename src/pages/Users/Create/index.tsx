import { Divider } from "antd";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { useTranslation } from "react-i18next";
import { UserForm } from "@/components/UserForm";

export default function CreateUserPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.create-user",
  });

  return (
    <PageLayout>
      <Title title={t("title")} />
      <Divider />
      <div className="max-w-md mx-auto">
        <UserForm />
      </div>
    </PageLayout>
  );
}

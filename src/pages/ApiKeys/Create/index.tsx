import { Divider, Form, message } from "antd";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { ApiKeyForm } from "@/components/ApiKeyForm";
import { useTranslation } from "react-i18next";
import { useCreateApiKeyMutation } from "@/graphql/generated";
import type { ApiKeyFormData } from "@/components/ApiKeyForm/types";

export default function CreateApiKeyPage() {
  const [messageApi, mContext] = message.useMessage();
  const [form] = Form.useForm();
  const { t } = useTranslation("", {
    keyPrefix: "pages.create-api-key",
  });

  const [createKey, { loading }] = useCreateApiKeyMutation({
    onCompleted() {
      messageApi.success(t("toasts.success"));
      form.resetFields();
    },
    onError() {
      messageApi.error(t("toasts.error"));
    },
  });

  return (
    <PageLayout>
      {mContext}
      <Title title={t("title")} />
      <Divider />
      <div className="max-w-md mx-auto">
        <ApiKeyForm
          form={form}
          onFinish={onSubmit}
          loading={loading}
          submitText={t("submit-button.text")}
        />
      </div>
    </PageLayout>
  );
  function onSubmit({ expiredAt, name }: ApiKeyFormData) {
    createKey({
      variables: {
        data: { name, expiredAt: expiredAt.toDate() },
      },
    });
  }
}

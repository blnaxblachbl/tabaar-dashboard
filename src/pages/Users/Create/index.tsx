import { Divider, Form, message } from "antd";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { UserForm } from "@/components/UserForm";
import { useCreateUserMutation } from "@/graphql/generated";
import type { UserFormData } from "@/components/UserForm/types";

export default function CreateUserPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.create-user",
  });
  const [messageApi, messageContext] = message.useMessage();
  const [form] = Form.useForm();

  const [createUser, { loading }] = useCreateUserMutation({
    onCompleted() {
      form.resetFields();
      messageApi.success(t("toasts.success"));
    },
    onError() {
      messageApi.error("toasts.error");
    },
  });

  return (
    <PageLayout>
      {messageContext}
      <Title title={t("title")} />
      <Divider />
      <div className="max-w-md mx-auto">
        <UserForm
          form={form}
          loading={loading}
          submitText={t("submit-button.text")}
          onFinish={onSubmit}
        />
      </div>
    </PageLayout>
  );
  function onSubmit(values: UserFormData) {
    createUser({
      variables: {
        data: values,
      },
    });
  }
}

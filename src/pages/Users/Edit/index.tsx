import { Button, Divider, Empty, message } from "antd";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { Title } from "@/components/Title";
import { PageLayout } from "@/components/PageLayout";
import {
  useFindOneUserQuery,
  useUpdateUserMutation,
} from "@/graphql/generated";
import { UserForm, UserFormSkeleton } from "@/components/UserForm";
import type { UserFormData } from "@/components/UserForm/types";

export function EditUserPage() {
  const { userId } = useParams();
  const [messageApi, messageContext] = message.useMessage();
  const { t } = useTranslation("", {
    keyPrefix: "pages.update-user",
  });

  const [updateUser, { loading: updateLoading }] = useUpdateUserMutation({
    onCompleted() {
      messageApi.success(t("toasts.success"));
    },
    onError() {
      messageApi.success(t("toasts.error"));
    },
  });

  const { data, loading } = useFindOneUserQuery({
    variables: { id: Number(userId) },
  });

  const user = data?.findOneUser;

  return (
    <PageLayout>
      {messageContext}
      <Title title={t("title")} />
      <Divider />
      <div className="max-w-md mx-auto">
        {loading && <UserFormSkeleton />}
        {!loading && user ? (
          <UserForm
            initialValues={{ name: user.name, email: user.email }}
            loading={updateLoading}
            submitText={t("submit-button.text")}
            onFinish={onSubmit}
          />
        ) : null}
        {!loading && !user ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("empty.description")}
          >
            <Link to="/users">
              <Button>{t("empty.button.text")}</Button>
            </Link>
          </Empty>
        ) : null}
      </div>
    </PageLayout>
  );
  function onSubmit(values: UserFormData) {
    updateUser({
      variables: {
        id: Number(userId),
        data: values,
      },
    });
  }
}

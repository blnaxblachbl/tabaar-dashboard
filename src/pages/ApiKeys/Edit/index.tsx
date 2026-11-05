import { Button, Divider, Empty, message } from "antd";
import { Link, useParams } from "react-router";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { ApiKeyForm, ApiKeyFormSkeleton } from "@/components/ApiKeyForm";
import {
  useFindOneApiKeyQuery,
  useUpdateApiKeyMutation,
} from "@/graphql/generated";
import type { ApiKeyFormData } from "@/components/ApiKeyForm/types";

export default function EditApiKeyPage() {
  const { apiKeyId } = useParams();
  const { t } = useTranslation("", {
    keyPrefix: "pages.update-api-key",
  });
  const [messageApi, mContext] = message.useMessage();

  const [updateKey, { loading: updateLoading }] = useUpdateApiKeyMutation({
    onCompleted() {
      messageApi.success(t("toasts.success"));
    },
    onError() {
      messageApi.success(t("toasts.error"));
    },
  });

  const { data, loading } = useFindOneApiKeyQuery({
    variables: { id: Number(apiKeyId) },
  });

  const apiKey = data?.findOneApiKey;

  return (
    <PageLayout>
      {mContext}
      <Title title={t("title")} />
      <Divider />
      <div className="max-w-md mx-auto">
        {loading && <ApiKeyFormSkeleton />}
        {!loading && apiKey ? (
          <ApiKeyForm
            initialValues={{
              name: apiKey.name,
              expiredAt: dayjs(apiKey.expiredAt),
            }}
            submitText={t("submit-button.text")}
            loading={updateLoading}
            onFinish={onSubmit}
          />
        ) : null}
        {!loading && !apiKey ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("empty.description")}
          >
            <Link to="/keys">
              <Button>{t("empty.button.text")}</Button>
            </Link>
          </Empty>
        ) : null}
      </div>
    </PageLayout>
  );
  function onSubmit({ name, expiredAt }: ApiKeyFormData) {
    updateKey({
      variables: {
        id: Number(apiKeyId),
        data: {
          name,
          expiredAt: expiredAt.toDate(),
        },
      },
    });
  }
}

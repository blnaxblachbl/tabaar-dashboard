import {
  Button,
  Divider,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { Link, useSearchParams } from "react-router";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { DEFAULT_API_KEYS_VARIABLES } from "@/utils/constants";
import {
  FindApiKeysDocument,
  useDeleteApiKeyMutation,
  useFindApiKeysQuery,
  type FindApiKeysQuery,
} from "@/graphql/generated";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { CopyOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function ApiKeysPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });
  const { i18n, t } = useTranslation("", {
    keyPrefix: "pages.api-keys",
  });
  const [messageApi, messageContext] = message.useMessage();
  const page = Number(searchParams.get("page"));

  const variables = {
    ...DEFAULT_API_KEYS_VARIABLES,
    skip: (page - 1) * DEFAULT_API_KEYS_VARIABLES.take!,
  };

  const { data, loading } = useFindApiKeysQuery({
    fetchPolicy: "cache-and-network",
    variables,
  });

  const apiKeys = data?.findApiKeys.apiKeys ?? [];
  const apiKeysCount = data?.findApiKeys.apiKeysCount ?? 0;

  const [delteApiKey, { loading: deleteLoading }] = useDeleteApiKeyMutation({
    onCompleted() {
      messageApi.success(t("toasts.success"));
    },
    onError() {
      messageApi.error(t("toasts.error"));
    },
    update(client, { data }) {
      if (data?.deleteApiKey) {
        client.writeQuery<FindApiKeysQuery>({
          query: FindApiKeysDocument,
          variables,
          data: {
            findApiKeys: {
              apiKeys: apiKeys.filter((u) => u.id !== data.deleteApiKey.id),
              apiKeysCount: apiKeysCount - 1,
            },
          },
        });
      }
    },
  });

  return (
    <PageLayout>
      {messageContext}
      <Title
        title={t("title") + ` (${apiKeysCount})`}
        actions={
          <Link to="create">
            <Button icon={<PlusOutlined />}>{t("create-button.text")}</Button>
          </Link>
        }
      />
      <Divider />
      <Table
        dataSource={apiKeys}
        columns={[
          {
            dataIndex: "name",
            title: t("columns.name.title"),
            render: (name: string, obj) => <Link to={`${obj.id}`}>{name}</Link>,
          },
          {
            dataIndex: "expiredAt",
            title: t("columns.expiration.title"),
            render: (expiredAt: Date) => {
              const date = dayjs(expiredAt);
              const expired = dayjs().isAfter(date);
              const dateString = date.toDate().toLocaleString(i18n.language, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              });

              return (
                <Space>
                  {expired && (
                    <Tag color={"red"}>{t("columns.expiration.expired")}</Tag>
                  )}
                  <Typography.Text>{dateString}</Typography.Text>
                </Space>
              );
            },
          },
          {
            title: t("columns.actions.title"),
            dataIndex: "id",
            render: (id: number, { key }) => (
              <Space>
                <Popconfirm
                  title={t("delete.title")}
                  okText={t("delete.okText")}
                  cancelText={t("delete.cancelText")}
                  onConfirm={deleteKey.bind(null, id)}
                >
                  <Button
                    loading={deleteLoading}
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
                <Button
                  onClick={copyKey.bind(null, key)}
                  icon={<CopyOutlined />}
                />
              </Space>
            ),
          },
        ]}
        loading={loading}
        pagination={{
          total: apiKeysCount,
          pageSize: DEFAULT_API_KEYS_VARIABLES.take!,
          onChange: onPageChange,
          showQuickJumper: false,
          placement: ["bottomCenter"],
          current: page,
        }}
      />
    </PageLayout>
  );
  async function onPageChange(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }
  function deleteKey(id: number) {
    delteApiKey({
      variables: { id },
    });
  }
  async function copyKey(key: string) {
    await navigator.clipboard.writeText(key);
    messageApi.success(t("toasts.copied"));
  }
}

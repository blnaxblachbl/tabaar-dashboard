import { Button, Divider, message, Popconfirm, Table } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import {
  FindUsersDocument,
  useDeleteUserMutation,
  useFindUsersQuery,
  type FindUsersQuery,
} from "@/graphql/generated";
import { DEFAULT_USERS_VARIABLES } from "@/utils/constants";
import { toLocaleDate } from "@/utils/date";

export default function UsersPage() {
  const [messageApi, mContext] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });
  const page = Number(searchParams.get("page"));
  const { t, i18n } = useTranslation("", {
    keyPrefix: "pages.users",
  });

  const variables = {
    ...DEFAULT_USERS_VARIABLES,
    skip: (page - 1) * DEFAULT_USERS_VARIABLES.take!,
  };

  const { data, loading } = useFindUsersQuery({
    fetchPolicy: "cache-and-network",
    variables,
  });

  const users = data?.findUsers.users ?? [];
  const usersCount = data?.findUsers.usersCount ?? 0;

  const [deleteUser, { loading: deleteloading }] = useDeleteUserMutation({
    onCompleted() {
      messageApi.success(t("toasts.deleted"));
    },
    onError() {
      messageApi.error(t("toasts.delete-error"));
    },
    update(client, { data }) {
      if (data?.deleteUser) {
        client.writeQuery<FindUsersQuery>({
          query: FindUsersDocument,
          variables,
          data: {
            findUsers: {
              users: users.filter((u) => u.id !== data.deleteUser.id),
              usersCount: usersCount - 1,
            },
          },
        });
      }
    },
  });

  return (
    <PageLayout>
      {mContext}
      <Title
        title={t("title") + ` (${usersCount})`}
        actions={
          <Link to="create">
            <Button icon={<PlusOutlined />}>{t("create-button.text")}</Button>
          </Link>
        }
      />
      <Divider />
      <Table
        dataSource={users}
        loading={loading}
        rowKey={"id"}
        columns={[
          {
            dataIndex: "name",
            title: t("columns.name.title"),
            render: (name, obj) => <Link to={`${obj.id}`}>{name}</Link>,
          },
          {
            dataIndex: "email",
            title: t("columns.email.title"),
          },
          {
            dataIndex: "createdAt",
            title: t("columns.createdAt.title"),
            render: (createdAt) => toLocaleDate(createdAt, i18n.language),
          },
          {
            dataIndex: "id",
            title: t("columns.actions.title"),
            render: (id: number) => (
              <Popconfirm
                title={t("delete.title")}
                okText={t("delete.okText")}
                cancelText={t("delete.cancelText")}
                onConfirm={deleteUser.bind(null, {
                  variables: { id },
                })}
                disabled={deleteloading}
              >
                <Button
                  loading={deleteloading}
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            ),
          },
        ]}
        pagination={{
          total: usersCount,
          pageSize: DEFAULT_USERS_VARIABLES.take!,
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
}

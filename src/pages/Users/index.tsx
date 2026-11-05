import { Button, Divider, Table } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { useFindUsersQuery } from "@/graphql/generated";
import { DEFAULT_USERS_VARIABLES } from "@/utils/constants";
import { toLocaleDate } from "@/utils/date";
import { PlusOutlined } from "@ant-design/icons";

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });
  const page = Number(searchParams.get("page"));
  const { t, i18n } = useTranslation("", {
    keyPrefix: "pages.users",
  });

  const { data, loading } = useFindUsersQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      ...DEFAULT_USERS_VARIABLES,
      skip: (page - 1) * DEFAULT_USERS_VARIABLES.take!,
    },
  });

  const users = data?.findUsers.users ?? [];
  const usersCount = data?.findUsers.usersCount ?? 0;

  return (
    <PageLayout>
      <Title
        title={t("title")}
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
            title: t("columns.name.label"),
            render: (name, obj) => <Link to={`${obj.id}`}>{name}</Link>,
          },
          {
            dataIndex: "email",
            title: t("columns.email.label"),
          },
          {
            dataIndex: "createdAt",
            title: t("columns.createdAt.label"),
            render: (createdAt) => toLocaleDate(createdAt, i18n.language),
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

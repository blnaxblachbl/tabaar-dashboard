import { Button, Divider, message, Table } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import { PlusOutlined } from "@ant-design/icons";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { useFindUsersQuery, type FindUsersFilters } from "@/graphql/generated";
import { DEFAULT_USERS_VARIABLES } from "@/utils/constants";
import { toLocaleDate } from "@/utils/date";
import { CollapsibleUserFilters } from "@/components/UserFilters";
import type { UserFiltersData } from "@/components/UserFilters/types";
import { UserActions } from "@/components/UserActions";
import { useDebounce } from "@/hooks/useDebounce";

export default function UsersPage() {
  const [messageApi, mContext] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });
  const page = Number(searchParams.get("page"));
  const search = searchParams.get("search") ?? undefined;
  const deleted = searchParams.get("deleted") === "true";

  const { t, i18n } = useTranslation("", {
    keyPrefix: "pages.users",
  });

  const filters: FindUsersFilters = {
    search,
    deleted,
  };

  const variables = {
    ...DEFAULT_USERS_VARIABLES,
    filters,
    skip: (page - 1) * DEFAULT_USERS_VARIABLES.take!,
  };

  const { data, loading, refetch } = useFindUsersQuery({
    fetchPolicy: "cache-and-network",
    variables,
  });

  const [debounceRefetch] = useDebounce(refetch, 1500);

  const users = data?.findUsers.users ?? [];
  const usersCount = data?.findUsers.usersCount ?? 0;

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
      <div className="mt-6">
        <CollapsibleUserFilters
          initialValues={{ search, deleted }}
          onSubmit={onFiltersSubmit}
        />
      </div>
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
            title: t("columns.actions.title"),
            render: (obj) => (
              <UserActions
                user={obj}
                onDeleted={() => {
                  messageApi.success(t("toasts.deleted"), 1.5);
                  debounceRefetch();
                }}
                onDeleteError={() => {
                  messageApi.error(t("toasts.delete-error"));
                }}
                onRestore={() => {
                  messageApi.success(t("toasts.restored"), 1.5);
                  debounceRefetch();
                }}
                onRestoreError={() => {
                  messageApi.error(t("toasts.restore-error"));
                }}
              />
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
  function onFiltersSubmit({ search, deleted }: UserFiltersData) {
    if (deleted) {
      searchParams.set("deleted", String(deleted));
    } else {
      searchParams.delete("deleted");
    }
    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }
}

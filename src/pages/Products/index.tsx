import {
  Button,
  Divider,
  message,
  Popover,
  Space,
  Upload,
  Typography,
  theme,
} from "antd";
import { InfoOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import {
  FindProductsDocument,
  useFindProductsQuery,
  useScrollProductsLazyQuery,
  type FindProductsQuery,
  type FindProductsQueryVariables,
} from "@/graphql/generated";
import { Title } from "@/components/Title";
import { parseProductsSearchParams } from "@/utils/searchParams/products";
import { CollapsibleProductsFilters } from "@/components/ProductsFilters";
import { useBulkCreate } from "@/hooks/useBulkCreate";
import { ProductsTable } from "@/components/ProductsTable";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductsPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.products",
  });
  const { token } = theme.useToken();
  const [searchParams, setSearchParams] = useSearchParams();
  const [messageApi, mContext] = message.useMessage();

  const variables = parseProductsSearchParams(searchParams);
  const { data, loading, refetch } = useFindProductsQuery({
    variables,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const [debounceRefetch] = useDebounce(refetch, 1500);

  const [scroll, { loading: scrollLoading, client }] =
    useScrollProductsLazyQuery({
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    });
  const { bulkCreate, loading: bulkLoading } = useBulkCreate({
    onCompleted() {
      messageApi.success(t("toasts.success"));
      refetch();
    },
    onError() {
      messageApi.error(t("toasts.error"));
    },
  });

  const products = data?.findProducts.products ?? [];
  const productsCount = data?.findProducts.productsCount ?? 0;
  const scrollId = data?.findProducts.scrollId;

  return (
    <PageLayout>
      {mContext}
      <Title
        title={t("title") + ` (${productsCount})`}
        actions={
          <Space>
            <Space.Compact>
              <Popover
                content={
                  <Space vertical className="max-w-md!">
                    <Typography.Text>
                      {t("file-button.info.text")}
                    </Typography.Text>
                    <Button
                      type="link"
                      href="/prducts-sample.json"
                      download={"prducts-sample.json"}
                      className="p-0!"
                    >
                      {t("file-button.info.download-button.text")}
                    </Button>
                  </Space>
                }
                trigger={"hover"}
                placement="leftTop"
                styles={{
                  container: {
                    backgroundColor: token.colorBgContainer,
                  },
                }}
              >
                <Button shape="square" icon={<InfoOutlined />} />
              </Popover>
              <Upload
                disabled={bulkLoading}
                showUploadList={false}
                customRequest={({ onError, onSuccess, file }) => {
                  bulkCreate(file as File)
                    .then(() => {
                      onSuccess?.("Ok");
                    })
                    .catch((e) => {
                      if (e instanceof Error) {
                        return onError?.(e);
                      }
                      onError?.(new Error("Internal server error"));
                    });
                }}
                accept={"application/json"}
              >
                <Button icon={<UploadOutlined />} loading={bulkLoading}>
                  {t("file-button.text")}
                </Button>
              </Upload>
            </Space.Compact>
            <Link to={"create"}>
              <Button icon={<PlusOutlined />}>{t("create-button.text")}</Button>
            </Link>
          </Space>
        }
      />
      <div className="mt-6">
        <CollapsibleProductsFilters
          variables={variables}
          onChange={onFilterChange}
        />
      </div>
      <Divider />
      <ProductsTable
        loading={loading}
        dataSource={products}
        onDeleted={onDeleted}
        onDeleteError={onDeleteError}
      />
      {products.length < productsCount && (
        <div className="mx-auto mt-6 w-fit">
          <Button onClick={handleLoadMore} loading={scrollLoading}>
            {t("load-more-button.text")}
          </Button>
        </div>
      )}
    </PageLayout>
  );
  function onDeleted() {
    messageApi.success(t("toasts.delete.success"), 1.5);
    debounceRefetch();
  }
  function onDeleteError() {
    messageApi.error(t("toasts.delete.error"));
  }
  async function handleLoadMore() {
    if (!scrollId) {
      return;
    }
    const { data } = await scroll({ variables: { scrollId } });
    if (data?.scrollProducts) {
      const { products: newProducts, ...rest } = data.scrollProducts;
      client.writeQuery<FindProductsQuery>({
        query: FindProductsDocument,
        variables,
        data: {
          findProducts: {
            ...rest,
            products: [...products, ...newProducts],
          },
        },
      });
    }
  }
  function onFilterChange({ query, filters }: FindProductsQueryVariables) {
    if (query) {
      searchParams.set("query", query);
    } else {
      searchParams.delete("query");
    }
    if (filters) {
      const stringFilters = JSON.stringify(filters);
      if (stringFilters === "{}") {
        searchParams.delete("filters");
      } else {
        const stringFiltersBase64 = btoa(stringFilters);
        searchParams.set("filters", stringFiltersBase64);
      }
    } else {
      searchParams.delete("filters");
    }
    setSearchParams(searchParams);
  }
}

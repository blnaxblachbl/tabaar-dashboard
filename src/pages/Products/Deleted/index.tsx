import { Button, Divider, message } from "antd";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import {
  FindDeletedProductsDocument,
  useFindDeletedProductsQuery,
  useScrollDeletedProductsLazyQuery,
  type FindDeletedProductsQuery,
  type FindDeletedProductsQueryVariables,
} from "@/graphql/generated";
import { Title } from "@/components/Title";
import { parseProductsSearchParams } from "@/utils/searchParams/products";
import { CollapsibleProductsFilters } from "@/components/ProductsFilters";
import { DeletedProductsTable } from "@/components/DeletedProductsTable";

export default function DeletedProductsPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.deleted-products",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [messageApi, mContext] = message.useMessage();

  const variables = parseProductsSearchParams(searchParams);
  const { data, loading, refetch } = useFindDeletedProductsQuery({
    variables,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const [scroll, { loading: scrollLoading, client }] =
    useScrollDeletedProductsLazyQuery({
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    });

  const products = data?.findDeletedProducts.products ?? [];
  const productsCount = data?.findDeletedProducts.productsCount ?? 0;
  const scrollId = data?.findDeletedProducts.scrollId ?? "";

  return (
    <PageLayout>
      {mContext}
      <Title title={t("title") + ` (${productsCount})`} />
      <div className="mt-6">
        <CollapsibleProductsFilters
          variables={variables}
          onChange={onFilterChange}
          filtersVisible={{
            prodcuts: {
              available: false,
            },
            variants: {},
          }}
        />
      </div>
      <Divider />
      <DeletedProductsTable
        loading={loading}
        dataSource={products}
        onRestored={onRestore}
        onRestoreError={onRestoreError}
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
  function onRestore() {
    messageApi.success("Product restored", 1.5, refetch);
  }
  function onRestoreError() {
    messageApi.error("Failed to restore Product");
  }
  async function handleLoadMore() {
    if (!scrollId) {
      return;
    }
    const { data } = await scroll({ variables: { scrollId } });
    if (data?.scrollDeletedProducts) {
      const { products: newProducts, ...rest } = data.scrollDeletedProducts;
      client.writeQuery<FindDeletedProductsQuery>({
        query: FindDeletedProductsDocument,
        variables,
        data: {
          findDeletedProducts: {
            ...rest,
            products: [...products, ...newProducts],
          },
        },
      });
    }
  }
  function onFilterChange({
    query,
    filters,
  }: FindDeletedProductsQueryVariables) {
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

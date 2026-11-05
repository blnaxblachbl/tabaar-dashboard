import { Activity } from "react";
import { Button, Col, Divider, Empty, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import { ProducCard, ProducCardSkeleton } from "@/components/ProductCard";
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

export default function ProductsPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.products",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const variables = parseProductsSearchParams(searchParams);
  const { data, loading } = useFindProductsQuery({
    variables,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const [scroll, { loading: scrollLoading, client }] =
    useScrollProductsLazyQuery({
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    });

  const products = data?.findProducts.products ?? [];
  const productsCount = data?.findProducts.productsCount ?? 0;
  const scrollId = data?.findProducts.scrollId;

  return (
    <PageLayout>
      <Title
        title={t("title")}
        actions={
          <Link to={"create"}>
            <Button icon={<PlusOutlined />}>{t("create-button.text")}</Button>
          </Link>
        }
      />
      <div className="mt-6">
        <CollapsibleProductsFilters
          variables={variables}
          onChange={onFilterChange}
        />
      </div>
      <Divider />
      <Activity mode={loading ? "visible" : "hidden"}>
        <Row gutter={[15, 15]}>
          {new Array(12).fill({}).map((_, index) => (
            <Col key={index} span={6}>
              <ProducCardSkeleton />
            </Col>
          ))}
        </Row>
      </Activity>
      <Activity mode={productsCount > 0 ? "visible" : "hidden"}>
        <Row gutter={[15, 15]}>
          {products.map((product) => (
            <Col key={product.id} span={6}>
              <Link to={product.id}>
                <ProducCard product={product} />
              </Link>
            </Col>
          ))}
        </Row>
        {products.length < productsCount && (
          <div className="mx-auto mt-6 w-fit">
            <Button onClick={handleLoadMore} loading={scrollLoading}>
              {t("load-more-button.text")}
            </Button>
          </div>
        )}
      </Activity>
      <Activity mode={productsCount === 0 ? "visible" : "hidden"}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t("empty.description")}
          classNames={{
            root: "my-21!",
            description: "mb-6!",
          }}
        >
          <Link to={"create"}>
            <Button type="primary">{t("empty.button.text")}</Button>
          </Link>
        </Empty>
      </Activity>
    </PageLayout>
  );
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

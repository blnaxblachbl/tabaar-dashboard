import { Activity } from "react";
import { Button, Col, Divider, Empty, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import { ProducCard, ProducCardSkeleton } from "@/components/ProductCard";
import { useFindProductsQuery } from "@/graphql/generated";
import { Title } from "@/components/Title";

export default function ProductsPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.products",
  });
  const { data, loading } = useFindProductsQuery();

  const products = data?.findProducts.products ?? [];
  const productsCount = data?.findProducts.productsCount ?? 0;
  // const scrollId = data?.findProducts.scrollId;

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
}

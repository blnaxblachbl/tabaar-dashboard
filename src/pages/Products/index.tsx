import { Activity } from "react";
import { Button, Col, Divider, Empty, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { PageLayout } from "@/components/PageLayout";
import { ProducCard, ProducCardSkeleton } from "@/components/ProductCard";
import { useFindProductsQuery } from "@/graphql/generated";
import { Title } from "@/components/Title";
import { Link } from "react-router";

export default function ProductsPage() {
  const { data, loading } = useFindProductsQuery();

  const products = data?.findProducts.products ?? [];
  const productsCount = data?.findProducts.productsCount ?? 0;
  // const scrollId = data?.findProducts.scrollId;

  return (
    <PageLayout>
      <Title
        title="Products"
        actions={
          <Link to={"create"}>
            <Button icon={<PlusOutlined />}>Create</Button>
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
              <ProducCard product={product} />
            </Col>
          ))}
        </Row>
      </Activity>
      <Activity mode={productsCount === 0 ? "visible" : "hidden"}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Products not found"
          classNames={{
            root: "my-21!",
            description: "mb-6!",
          }}
        >
          <Button type="primary">Create new Product</Button>
        </Empty>
      </Activity>
    </PageLayout>
  );
}

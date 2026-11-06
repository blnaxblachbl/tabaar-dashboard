import { Card, Col, Divider, Row, theme } from "antd";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";

import GraphQLIcon from "@/assets/graphql.svg?react";
import ApiSvg from "@/assets/api.svg?react";
import GrpcSvg from "@/assets/grpc.svg?react";
import { Link } from "react-router";

export default function HomePage() {
  const { token } = theme.useToken();

  return (
    <PageLayout>
      <Title title="Home" />
      <Divider />
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <Link to={"/docs/rest"}>
            <Card
              cover={
                <ApiSvg className="aspect-video max-w-1/2 mx-auto w-full" />
              }
              classNames={{
                body: "p-3!",
                cover: "p-3!",
                root: "overflow-hidden!",
              }}
              styles={{
                cover: {
                  backgroundColor: token.colorBgElevated,
                },
              }}
            >
              <Card.Meta title="Rest Api Docs" description="Rest API docs" />
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to={"/docs/graphql"}>
            <Card
              cover={<GraphQLIcon className="aspect-video max-w-1/2 mx-auto" />}
              classNames={{
                body: "p-3!",
                cover: "p-3!",
                root: "overflow-hidden!",
              }}
              styles={{
                cover: {
                  backgroundColor: token.colorBgElevated,
                },
              }}
            >
              <Card.Meta
                title="GraphQL Api Docs"
                description="GraphQL API docs"
              />
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to={"/docs/grpc"}>
            <Card
              cover={<GrpcSvg className="aspect-video max-w-1/2 mx-auto" />}
              classNames={{
                body: "p-3!",
                cover: "p-3!",
                root: "overflow-hidden!",
              }}
              styles={{
                cover: {
                  backgroundColor: token.colorBgElevated,
                },
              }}
            >
              <Card.Meta title="gRPC Api Docs" description="gRPC API docs" />
            </Card>
          </Link>
        </Col>
      </Row>
    </PageLayout>
  );
}

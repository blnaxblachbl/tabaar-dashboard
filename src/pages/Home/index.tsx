import { Button, Card, Col, Divider, Row, theme, Typography } from "antd";
import { CloudDownloadOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";

import GraphQLIcon from "@/assets/graphql.svg?react";
import ApiSvg from "@/assets/api.svg?react";
import GrpcSvg from "@/assets/grpc.svg?react";

export default function HomePage() {
  const { token } = theme.useToken();
  const { t } = useTranslation("", {
    keyPrefix: "pages.home",
  });

  return (
    <PageLayout>
      <main className="space-y-18">
        <section>
          <Title title={t("tabaar-title")} />
          <Divider />
          <Typography.Paragraph className="text-lg!">
            {t("description")}
          </Typography.Paragraph>
          <Typography.Paragraph className="text-lg!">
            {t("explain")}
          </Typography.Paragraph>
        </section>
        <section>
          <Title title={t("docs.title")} />
          <Divider />
          <Row gutter={[12, 12]}>
            <Col xs={24} md={12} lg={8}>
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
                actions={[
                  <Link key="docs" to={"/docs/rest"}>
                    <Button
                      icon={<SolutionOutlined />}
                      type="text"
                      className="hover:bg-transparent!"
                    >
                      {t("docs.docs")}
                    </Button>
                  </Link>,
                  <a
                    key={"download"}
                    href="/swagger.json"
                    download={"swagger.json"}
                  >
                    <Button
                      icon={<CloudDownloadOutlined />}
                      type="text"
                      className="hover:bg-transparent!"
                    >
                      JSON
                    </Button>
                  </a>,
                ]}
              >
                <Card.Meta
                  title={"Rest API"}
                  description={t("docs.rest.description")}
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card
                cover={
                  <GraphQLIcon className="aspect-video max-w-1/2 mx-auto" />
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
                actions={[
                  <Link key="docs" to={"/docs/graphql"}>
                    <Button
                      icon={<SolutionOutlined />}
                      type="text"
                      className="hover:bg-transparent!"
                    >
                      {t("docs.docs")}
                    </Button>
                  </Link>,
                  <a
                    key={"download"}
                    href="/schema.graphql"
                    download={"schema.graphql"}
                  >
                    <Button
                      icon={<CloudDownloadOutlined />}
                      type="text"
                      className="hover:bg-transparent!"
                    >
                      Schema
                    </Button>
                  </a>,
                ]}
              >
                <Card.Meta
                  title="GraphQL API"
                  description={t("docs.graphql.description")}
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
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
                actions={[
                  <Link key="docs" to={"/docs/grpc"}>
                    <Button
                      icon={<SolutionOutlined />}
                      type="text"
                      className="hover:bg-transparent!"
                    >
                      {t("docs.docs")}
                    </Button>
                  </Link>,
                  <a
                    key={"download"}
                    href="/protobufs.zip"
                    download={"protobufs.zip"}
                  >
                    <Button
                      icon={<CloudDownloadOutlined />}
                      type="text"
                      className="hover:bg-transparent!"
                    >
                      Protobufs
                    </Button>
                  </a>,
                ]}
              >
                <Card.Meta
                  title="gRPC API"
                  description={t("docs.grpc.description")}
                />
              </Card>
            </Col>
          </Row>
        </section>
      </main>
    </PageLayout>
  );
}

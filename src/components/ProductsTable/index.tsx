import { useCallback } from "react";
import { Table, Image, Tag, type TableProps, Typography } from "antd";
import { useTranslation } from "react-i18next";

import type {
  ProductFragment,
  LocaleContentFragment,
} from "@/graphql/generated";
import { extractImages } from "@/utils/product/extractImages";
import { toLocaleDate } from "@/utils/date";
import { Link } from "react-router";

export function ProductsTable(props: TableProps<ProductFragment>) {
  const { t, i18n } = useTranslation("", {
    keyPrefix: "components.products-table",
  });

  const getContent = useCallback(
    (locales: LocaleContentFragment[]) => {
      const exist = locales.find((n) => n.locale === i18n.language);
      return exist?.content ?? locales[0].content;
    },
    [i18n.language],
  );

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      scroll={{ x: true }}
      columns={[
        {
          title: t("images.title"),
          dataIndex: "variants",
          render: (variants, product) => {
            const sources = extractImages(product.id, variants);
            return (
              <Image.PreviewGroup items={sources}>
                <Image src={sources[0]} classNames={{ root: "max-w-15" }} />
              </Image.PreviewGroup>
            );
          },
          width: 100,
        },
        {
          title: t("name.title"),
          dataIndex: "name",
          render: (name, { id }) => <Link to={id}>{getContent(name)}</Link>,
          width: 200,
        },
        {
          title: t("description.title"),
          dataIndex: "description",
          render: (description) => (
            <Typography.Paragraph
              className="mb-0!"
              type="secondary"
              ellipsis={{ rows: 2 }}
            >
              {getContent(description)}
            </Typography.Paragraph>
          ),
          minWidth: 400,
        },
        {
          title: t("price.title"),
          dataIndex: "minPrice",
          render: (minPrice, { maxPrice }) =>
            minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`,
          className: "text-nowrap",
        },
        {
          title: t("availability.title"),
          dataIndex: "available",
          render: (available) => (
            <Tag variant="solid" color={available ? "green" : "red"}>
              {available
                ? t("availability.available")
                : t("availability.not-available")}
            </Tag>
          ),
        },
        {
          title: t("created.title"),
          dataIndex: "createdAt",
          render: (createdAt) => toLocaleDate(createdAt, i18n.language),
          className: "text-nowrap",
        },
      ]}
      {...props}
    />
  );
}

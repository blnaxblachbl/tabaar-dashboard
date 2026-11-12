import { useCallback } from "react";
import { Table, Image, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { ProductActions } from "@/components/ProductActions";
import { extractImages } from "@/utils/product/extractImages";
import { toLocaleDate } from "@/utils/date";
import { type LocaleContentFragment } from "@/graphql/generated";

import type { DeletedProductsTableProps } from "./types";

export function DeletedProductsTable({
  onRestored = () => {},
  onRestoreError = () => {},
  ...props
}: DeletedProductsTableProps) {
  const { t, i18n } = useTranslation("", {
    keyPrefix: "components.deleted-products-table",
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
          render: (name) => getContent(name),
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
          title: t("deleted.title"),
          dataIndex: "updatedAt",
          render: (updatedAt) => toLocaleDate(updatedAt, i18n.language),
          className: "text-nowrap",
        },
        {
          title: t("actions.title"),
          render: (obj) => (
            <ProductActions
              product={obj}
              deleted
              onRestore={onRestored}
              onRestoreError={onRestoreError}
            />
          ),
        },
      ]}
      {...props}
    />
  );
}

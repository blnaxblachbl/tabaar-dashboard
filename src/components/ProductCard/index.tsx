import { useCallback, useMemo } from "react";
import { Card, Typography, Skeleton, Image, Carousel, Tag } from "antd";
import { useTranslation } from "react-i18next";

import type { ProductCardProps } from "./types";
import { toLocaleDate } from "@/utils/date";
import { extractImages } from "@/utils/product/extractImages";
import type { LocaleContentFragment } from "@/graphql/generated";

export function ProducCard({ product }: ProductCardProps) {
  const { i18n, t } = useTranslation("", {
    keyPrefix: "components.product-card",
  });

  const images = useMemo(
    () => extractImages(product.id, product.variants),
    [product],
  );

  const getContent = useCallback(
    (locales: LocaleContentFragment[]) => {
      const exist = locales.find((n) => n.locale === i18n.language);
      return exist?.content ?? locales[0].content;
    },
    [i18n.language],
  );

  return (
    <Card
      cover={
        <div className="relative">
          <Carousel arrows>
            {images.map((image) => (
              <div key={image}>
                <Image
                  src={image}
                  preview={false}
                  classNames={{
                    image: "aspect-5/3! object-cover w-full!",
                    root: "w-full!",
                  }}
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute top-2 right-2">
            <Tag variant="solid" color={product.available ? "green" : "red"}>
              {product.available ? "Available" : "Not Available"}
            </Tag>
          </div>
        </div>
      }
      classNames={{
        body: "p-3!",
        root: "overflow-hidden cursor-pointer",
      }}
    >
      <Card.Meta
        title={getContent(product.name)}
        description={
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 2 }}
            className="mb-0!"
          >
            {getContent(product.description)}
          </Typography.Paragraph>
        }
      />
      <div className="space-y-3">
        <div className="flex items-end justify-between mt-3">
          <Typography.Text>
            {product.available
              ? `${product.minPrice}-${product.maxPrice}`
              : "N/A"}
          </Typography.Text>
          <Typography.Text type="secondary">
            {t("created")} {toLocaleDate(product.createdAt, i18n.language)}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}

export function ProducCardSkeleton() {
  return (
    <Card
      cover={
        <Skeleton.Image
          classNames={{
            content: "w-full! h-full!",
            root: "w-full! aspect-5/3",
          }}
          active
        />
      }
      classNames={{
        body: "p-3!",
      }}
    >
      <Skeleton active paragraph={{ rows: 2 }} />
    </Card>
  );
}

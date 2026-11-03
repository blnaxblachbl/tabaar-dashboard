import { useMemo } from "react";
import { Card, Typography, Skeleton, Image, Carousel, Tag } from "antd";
import { useTranslation } from "react-i18next";

import type { ProductCardProps } from "./types";
import { toLocaleDate } from "@/utils/date";
import { extractImages } from "@/utils/product/extractImages";

export function ProducCard({ product }: ProductCardProps) {
  const { i18n } = useTranslation("", {
    keyPrefix: "",
  });

  const images = useMemo(
    () => extractImages(product.id, product.variants),
    [product],
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
                  classNames={{ image: "aspect-5/3! object-cover" }}
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute top-2 right-2">
            <Tag color={product.available ? "green-inverse" : "red-inverse"}>
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
        title={product.name}
        description={
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 2 }}
            className="mb-0!"
          >
            {product.description}
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
            Created: {toLocaleDate(product.createdAt, i18n.language)}
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

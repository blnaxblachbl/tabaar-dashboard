import { Card, Typography, Skeleton, Image } from "antd";

import type { ProductCardProps } from "./types";

export function ProducCard({ product }: ProductCardProps) {
  return (
    <Card
      cover={
        <Image
          src={"/no-image.webp"}
          preview={false}
          classNames={{ image: "aspect-5/3! object-cover" }}
        />
      }
      classNames={{
        body: "p-3!",
        root: "overflow-hidden cursor-pointer",
      }}
    >
      <Card.Meta
        title={product.name}
        description={
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }} className="mb-0!">
            {product.description}
          </Typography.Paragraph>
        }
      />
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

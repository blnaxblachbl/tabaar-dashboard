import {
  Table,
  Image,
  Typography,
  Space,
  Button,
  Popconfirm,
  message,
  Divider,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { Title } from "@/components/Title";
import { extractImages } from "@/utils/product/extractImages";
import { useDeleteVariantMutation } from "@/graphql/generated";
import { updateProduct } from "@/utils/product/updateQuery";
import type { VariantsTableProps } from "./types";
import { Link } from "react-router";

export function VariantsTable({ productId, ...props }: VariantsTableProps) {
  const [messageApi, messageContext] = message.useMessage();
  const { t } = useTranslation("", {
    keyPrefix: "components.variants-table",
  });

  const [deleteVariant, { loading: deleteLoading }] = useDeleteVariantMutation({
    onCompleted() {
      messageApi.success(t("toasts.delete-success"));
    },
    onError() {
      messageApi.error(t("toasts.delete-error"));
    },
    update: (client, { data }) => {
      if (!data?.deleteVariant) {
        return;
      }
      updateProduct({
        client,
        updatedProduct: data.deleteVariant,
      });
    },
  });

  return (
    <>
      {messageContext}
      <Title
        title={t("title")}
        actions={
          <Link to="variants/create">
            <Button icon={<PlusOutlined />}>{t("create")}</Button>
          </Link>
        }
      />
      <Divider />
      <Table
        rowKey={"id"}
        columns={[
          {
            dataIndex: "images",
            title: t("columns.images.title"),
            render: (_, obj) => {
              const sources = extractImages(productId, [obj]);
              return (
                <Image.PreviewGroup items={sources}>
                  <Image src={sources[0]} />
                </Image.PreviewGroup>
              );
            },
            width: 50,
          },
          {
            dataIndex: "price",
            title: t("columns.price.title"),
            render: (price, obj) => `${price} ${obj.currency}`,
          },
          {
            dataIndex: "count",
            title: t("columns.count.title"),
          },
          {
            dataIndex: "characterstics",
            title: t("columns.characterstics.title"),
            render: (chars) => (
              <Typography.Paragraph className="mb-3!">
                {Object.entries(chars)
                  .map((entries) => entries.join(": "))
                  .join(", ")}
              </Typography.Paragraph>
            ),
          },
          {
            title: t("columns.actions.title"),
            render: (_, obj) => (
              <Space.Compact>
                <Link to={`variants/${obj.id}`}>
                  <Button disabled={deleteLoading} icon={<EditOutlined />} />
                </Link>
                <Popconfirm
                  title={t("delete-popup.title")}
                  okText={t("delete-popup.okText")}
                  cancelText={t("delete-popup.cancelText")}
                  disabled={deleteLoading}
                  onConfirm={deleteVariant.bind(null, {
                    variables: { id: productId, variantId: obj.id },
                  })}
                >
                  <Button
                    loading={deleteLoading}
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Space.Compact>
            ),
            width: 200,
          },
        ]}
        pagination={false}
        {...props}
      />
    </>
  );
}

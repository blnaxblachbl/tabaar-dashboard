import { Button, Popconfirm } from "antd";
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import {
  useDeleteProductMutation,
  useRestoreProductMutation,
} from "@/graphql/generated";

import type { ProductActionsProps } from "./types";

export function ProductActions({
  onDeleted,
  onRestore,
  onDeleteError,
  onRestoreError,
  product,
  deleted = false,
}: ProductActionsProps) {
  const { t } = useTranslation("", {
    keyPrefix: `components.product-actions.${deleted ? "restore" : "delete"}`,
  });

  const [deleteProduct, { data: deleteData, loading: deleteLoading }] =
    useDeleteProductMutation({
      onCompleted({ deleteProduct }) {
        onDeleted?.(deleteProduct);
      },
      onError: onDeleteError,
    });

  const [restoreProduct, { data: restoreData, loading: restoreLoading }] =
    useRestoreProductMutation({
      onCompleted({ restoreProduct }) {
        onRestore?.(restoreProduct);
      },
      onError: onRestoreError,
    });

  const complated = !!(
    deleteData?.deleteProduct || restoreData?.restoreProduct
  );

  return (
    <Popconfirm
      title={t(`confirmations`)}
      okText={t(`okText`)}
      cancelText={t(`cancelText`)}
      onConfirm={onConfirm}
      disabled={complated}
    >
      <Button
        disabled={complated}
        loading={restoreLoading || deleteLoading}
        icon={deleted ? <RollbackOutlined /> : <DeleteOutlined />}
        type={deleted ? "primary" : "default"}
        danger={!deleted}
      />
    </Popconfirm>
  );
  function onConfirm() {
    if (deleted) {
      restoreProduct({ variables: { id: product.id } });
    } else {
      deleteProduct({ variables: { id: product.id } });
    }
  }
}

import { Button, Popconfirm } from "antd";
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import {
  useDeleteUserMutation,
  useRestoreUserMutation,
} from "@/graphql/generated";

import type { UserActionsProps } from "./types";

export function UserActions({
  onDeleted,
  onRestore,
  onDeleteError,
  onRestoreError,
  user,
}: UserActionsProps) {
  const { t } = useTranslation("", {
    keyPrefix: `components.user-actions.${user.deleted ? "restore" : "delete"}`,
  });

  const [deleteUser, { data: deleteData, loading: deleteLoading }] =
    useDeleteUserMutation({
      onCompleted({ deleteUser }) {
        onDeleted?.(deleteUser);
      },
      onError: onDeleteError,
    });

  const [restoreUser, { data: restoreData, loading: restoreLoading }] =
    useRestoreUserMutation({
      onCompleted({ restoreUser }) {
        onRestore?.(restoreUser);
      },
      onError: onRestoreError,
    });

  const complated = !!(deleteData?.deleteUser || restoreData?.restoreUser);

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
        icon={user.deleted ? <RollbackOutlined /> : <DeleteOutlined />}
        type={user.deleted ? "primary" : "default"}
        danger={!user.deleted}
      />
    </Popconfirm>
  );
  function onConfirm() {
    if (user.deleted) {
      restoreUser({ variables: { id: user.id } });
    } else {
      deleteUser({ variables: { id: user.id } });
    }
  }
}

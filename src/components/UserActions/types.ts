import type { UserFragment } from "@/graphql/generated";

export type UserActionsProps = {
  onDeleted?: (user: UserFragment) => void;
  onRestore?: (user: UserFragment) => void;
  onRestoreError?: () => void;
  onDeleteError?: () => void;
  user: UserFragment;
};

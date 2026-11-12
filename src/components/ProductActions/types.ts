import type { ProductFragment } from "@/graphql/generated";

export type ProductActionsProps = {
  onDeleted?: (products: ProductFragment) => void;
  onRestore?: (products: ProductFragment) => void;
  onRestoreError?: () => void;
  onDeleteError?: () => void;
  product: ProductFragment;
  deleted?: boolean;
};

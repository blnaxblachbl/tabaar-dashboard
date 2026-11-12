import type { ProductFragment } from "@/graphql/generated";
import type { TableProps } from "antd";

export type DeletedProductsTableProps = TableProps<ProductFragment> & {
  onRestored?: (product: ProductFragment) => void;
  onRestoreError?: () => void;
};

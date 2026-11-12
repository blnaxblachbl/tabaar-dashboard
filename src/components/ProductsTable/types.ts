import type { TableProps } from "antd";
import type { ProductFragment } from "@/graphql/generated";

export type ProductsTableProps = TableProps<ProductFragment> & {
  onDeleted?: (product: ProductFragment) => void;
  onDeleteError?: () => void;
};

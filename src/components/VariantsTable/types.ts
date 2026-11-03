import type { TableProps } from "antd";

import type { VariantFragment } from "@/graphql/generated";

export type VariantsTableProps = TableProps<VariantFragment> & {
  productId: string;
};

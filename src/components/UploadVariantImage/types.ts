import type { VariantFragment } from "@/graphql/generated";

export type UploadVariantImageProps = {
  productId: string;
  variant: VariantFragment;
};

import type { VariantFragment } from "@/graphql/generated";

export function extractImages(productId: string, variants: VariantFragment[]) {
  const images = variants.flatMap((item) => {
    return item.images.map(
      (image) => `/api/image/${productId}/${item.id}/${image}`,
    );
  });
  if (images.length === 0) {
    return ["/no-image.webp"];
  }
  return images;
}

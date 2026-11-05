import {
  FindOneProductDocument,
  FindProductsDocument,
  type FindOneProductQuery,
  type FindProductsQuery,
} from "@/graphql/generated";
import type {
  AppendProductOprions,
  DeleteProductOptions,
  UpdateProductOptions,
  UpdateOneProductOptions,
} from "./types";
import { DEFAULT_PRODUCTS_VARIABLES } from "@/utils/constants";

export function appentProduct({
  client,
  variables = DEFAULT_PRODUCTS_VARIABLES,
  newProduct,
}: AppendProductOprions) {
  const prev = client.readQuery<FindProductsQuery>({
    query: FindProductsDocument,
    variables,
  });

  const prevProducts = prev?.findProducts.products ?? [];
  const scrollId = prev?.findProducts.scrollId ?? "";
  const productsCount = prev?.findProducts.productsCount ?? 0;
  const newProducts = [newProduct, ...prevProducts];
  client.writeQuery<FindProductsQuery>({
    query: FindProductsDocument,
    variables,
    data: {
      findProducts: {
        products: newProducts,
        productsCount: productsCount + 1,
        scrollId,
      },
    },
  });
}

export function updateProduct({
  client,
  variables = DEFAULT_PRODUCTS_VARIABLES,
  updatedProduct,
}: UpdateProductOptions) {
  const prev = client.readQuery<FindProductsQuery>({
    query: FindProductsDocument,
    variables,
  });
  if (!prev) {
    return;
  }

  const prevProducts = prev.findProducts.products;
  const scrollId = prev.findProducts.scrollId;
  const productsCount = prev.findProducts.productsCount;
  const newProducts = prevProducts.map((prevProduct) => {
    if (prevProduct.id === updatedProduct.id) {
      return updatedProduct;
    }
    return prevProduct;
  });
  client.writeQuery<FindProductsQuery>({
    query: FindProductsDocument,
    variables,
    data: {
      findProducts: {
        products: newProducts,
        productsCount,
        scrollId,
      },
    },
  });
}

export function deleteProduct({
  client,
  variables = DEFAULT_PRODUCTS_VARIABLES,
  deletedProductId,
}: DeleteProductOptions) {
  const prev = client.readQuery<FindProductsQuery>({
    query: FindProductsDocument,
    variables,
  });

  const prevProducts = prev?.findProducts.products ?? [];
  if (prevProducts.length === 0) {
    return;
  }
  const scrollId = prev?.findProducts.scrollId ?? "";
  const productsCount = prev?.findProducts.productsCount ?? 0;
  const newProducts = prevProducts.filter(
    (prevProduct) => prevProduct.id !== deletedProductId,
  );
  client.writeQuery<FindProductsQuery>({
    query: FindProductsDocument,
    variables,
    data: {
      findProducts: {
        products: newProducts,
        productsCount: productsCount - 1,
        scrollId,
      },
    },
  });
}

export function updateOneProduct({
  client,
  variables,
  updatedProduct,
}: UpdateOneProductOptions) {
  client.writeQuery<FindOneProductQuery>({
    query: FindOneProductDocument,
    variables,
    data: {
      findOneProduct: updatedProduct,
    },
  });
}

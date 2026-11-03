import type { ApolloCache } from "@apollo/client";

import {
  type FindProductsQueryVariables,
  type ProductFragment,
} from "@/graphql/generated";

export type AppendProductOprions = {
  client: ApolloCache;
  variables?: FindProductsQueryVariables;
  newProduct: ProductFragment;
};
export type UpdateProductOptions = {
  client: ApolloCache;
  variables?: FindProductsQueryVariables;
  updatedProduct: ProductFragment;
};
export type DeleteProductOptions = {
  client: ApolloCache;
  variables?: FindProductsQueryVariables;
  deletedProductId: string;
};

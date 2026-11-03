import type { ApolloCache } from "@apollo/client";

import {
  type FindProductsQueryVariables,
  type ProductListFragment,
} from "@/graphql/generated";

export type AppendProductOprions = {
  client: ApolloCache;
  variables?: FindProductsQueryVariables;
  newProduct: ProductListFragment;
};
export type UpdateProductOptions = {
  client: ApolloCache;
  variables?: FindProductsQueryVariables;
  updatedProduct: ProductListFragment;
};
export type DeleteProductOptions = {
  client: ApolloCache;
  variables?: FindProductsQueryVariables;
  deletedProductId: string;
};

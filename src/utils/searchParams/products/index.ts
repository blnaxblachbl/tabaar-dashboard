import type { FindProductsQueryVariables } from "@/graphql/generated";
import { DEFAULT_PRODUCTS_VARIABLES } from "@/utils/constants";

export function parseProductsSearchParams(
  params: URLSearchParams,
): FindProductsQueryVariables {
  const query = params.get("query") ?? undefined;
  const filters = params.get("filters") ?? undefined;
  const res: FindProductsQueryVariables = {
    ...DEFAULT_PRODUCTS_VARIABLES,
    query,
    filters: undefined,
  };
  if (filters) {
    res.filters = JSON.parse(
      atob(filters),
    ) as FindProductsQueryVariables["filters"];
  }
  return res;
}

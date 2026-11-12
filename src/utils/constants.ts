import type { ProductsFiltersVisible } from "@/components/ProductsFilters/types";
import type {
  FindProductsQueryVariables,
  FindUsersQueryVariables,
  FindApiKeysQueryVariables,
} from "@/graphql/generated";

export const SAVED_LANGUAGE_KEY = "saved_language";
export const SAVED_ACCESS_TOKEN_KEY = "access_token";
export const SAVED_REFRESH_TOKEN_KEY = "refresh_token";

export const DEFAULT_PRODUCTS_VARIABLES: FindProductsQueryVariables = {
  take: 50,
};
export const DEFAULT_USERS_VARIABLES: FindUsersQueryVariables = {
  take: 50,
};
export const DEFAULT_API_KEYS_VARIABLES: FindApiKeysQueryVariables = {
  take: 50,
};

export const DEFAULT_PRODUCT_FILTER_VISBILE: ProductsFiltersVisible = {
  prodcuts: {
    query: true,
    available: true,
    minPrice: true,
    maxPrice: true,
    characterstics: true,
  },
  variants: {
    currency: true,
    price: true,
    count: true,
    characterstics: true,
  },
};

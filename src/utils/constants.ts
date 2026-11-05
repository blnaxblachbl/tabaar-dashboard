import type { FindProductsQueryVariables, FindUsersQueryVariables } from "@/graphql/generated";

export const SAVED_LANGUAGE_KEY = "saved_language";
export const SAVED_ACCESS_TOKEN_KEY = "access_token";
export const SAVED_REFRESH_TOKEN_KEY = "refresh_token";

export const DEFAULT_PRODUCTS_VARIABLES: FindProductsQueryVariables = {
  take: 50,
};
export const DEFAULT_USERS_VARIABLES: FindUsersQueryVariables = {
  take: 50,
};

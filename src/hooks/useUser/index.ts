import type { QueryHookOptions } from "@apollo/client/react";

import {
  useFindMeQuery,
  type FindMeQuery,
  type FindMeQueryVariables,
} from "@/graphql/generated";

export function useUser(
  args?: QueryHookOptions<FindMeQuery, FindMeQueryVariables>,
) {
  const { data, ...rest } = useFindMeQuery(args);

  return {
    user: data?.findMe ?? null,
    ...rest,
  };
}

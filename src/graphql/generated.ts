/* eslint-disable */
// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CreateProductInput = {
  characterstics?: Record<string, string | number | boolean> | null | undefined;
  description: string;
  name: string;
};

export type CreateVariantInput = {
  characterstics: Record<string, string | number | boolean>;
  count: number;
  currency: string;
  price: number;
};

export type FiltersInput = {
  available?: boolean | null | undefined;
  characterstics?: Record<string, string | number | boolean> | null | undefined;
  deleted?: boolean | null | undefined;
  maxPrice?: FloatRangeInput | null | undefined;
  minPrice?: FloatRangeInput | null | undefined;
  variants?: VariantFilterInput | null | undefined;
};

export type FloatRangeInput = {
  gte?: number | null | undefined;
  lte?: number | null | undefined;
};

export type IntRangeInput = {
  gte?: number | null | undefined;
  lte?: number | null | undefined;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type UpdateProductInput = {
  characterstics?: Record<string, string | number | boolean> | null | undefined;
  description?: string | null | undefined;
  name?: string | null | undefined;
};

export type UpdateVariantInput = {
  characterstics?: Record<string, string | number | boolean> | null | undefined;
  count?: number | null | undefined;
  currency?: string | null | undefined;
  price?: number | null | undefined;
};

export type VariantFilterInput = {
  characterstics?: Record<string, string | number | boolean> | null | undefined;
  count?: IntRangeInput | null | undefined;
  currency?: string | null | undefined;
  price?: FloatRangeInput | null | undefined;
};

export type UserFragment = { id: number, createdAt: Date, updatedAt: Date, name: string, email: string };

export type ProductFragment = { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> };

export type VariantFragment = { id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> };

export type FindProductsQueryVariables = Exact<{
  query?: string | null | undefined;
  take?: number | null | undefined;
  filters?: FiltersInput | null | undefined;
}>;


export type FindProductsQuery = { findProducts: { productsCount: number, scrollId: string, products: Array<{ id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> }> } };

export type ScrollProductsQueryVariables = Exact<{
  scrollId?: string | null | undefined;
}>;


export type ScrollProductsQuery = { scrollProducts: { productsCount: number, scrollId: string, products: Array<{ id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> }> } };

export type FindOneProductQueryVariables = Exact<{
  id?: string | null | undefined;
}>;


export type FindOneProductQuery = { findOneProduct: { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> } };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { createProduct: { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> } };

export type UpdateProductMutationVariables = Exact<{
  id: string;
  data: UpdateProductInput;
}>;


export type UpdateProductMutation = { updateProduct: { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> } };

export type DeleteProductMutationVariables = Exact<{
  id: string;
}>;


export type DeleteProductMutation = { deleteProduct: { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> } };

export type DeleteVariantMutationVariables = Exact<{
  id: string;
  variantId: string;
}>;


export type DeleteVariantMutation = { deleteVariant: { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> } };

export type UpdateVariantMutationVariables = Exact<{
  id: string;
  variantId: string;
  data: UpdateVariantInput;
}>;


export type UpdateVariantMutation = { updateVariant: { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> } };

export type AppendVariantMutationVariables = Exact<{
  id: string;
  data: CreateVariantInput;
}>;


export type AppendVariantMutation = { appendVariant: { id: string, createdAt: Date, updatedAt: Date, name: string, characterstics: Record<string, string | number | boolean> | null, minPrice: number, maxPrice: number, description: string, available: boolean, variants: Array<{ id: string, createdAt: Date, updatedAt: Date, characterstics: Record<string, string | number | boolean>, price: number, count: number, currency: string, images: Array<string> }> } };

export type LoginUserMutationVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginUserMutation = { loginUser: { accessToken: string, refreshToken: string, user: { id: number, createdAt: Date, updatedAt: Date, name: string, email: string } } };

export type FindMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMeQuery = { findMe: { id: number, createdAt: Date, updatedAt: Date, name: string, email: string } | null };

export type FindUsersQueryVariables = Exact<{
  skip?: number | null | undefined;
  take?: number | null | undefined;
}>;


export type FindUsersQuery = { findUsers: { usersCount: number, users: Array<{ id: number, createdAt: Date, updatedAt: Date, name: string, email: string }> } };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  createdAt
  updatedAt
  name
  email
}
    `;
export const VariantFragmentDoc = gql`
    fragment Variant on Variant {
  id
  createdAt
  updatedAt
  characterstics
  price
  count
  currency
  images
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on Product {
  id
  createdAt
  updatedAt
  name
  characterstics
  minPrice
  maxPrice
  description
  available
  variants {
    ...Variant
  }
}
    `;
export const FindProductsDocument = gql`
    query FindProducts($query: String, $take: Int, $filters: FiltersInput) {
  findProducts(query: $query, take: $take, filters: $filters) {
    products {
      ...Product
    }
    productsCount
    scrollId
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;

/**
 * __useFindProductsQuery__
 *
 * To run a query within a React component, call `useFindProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      take: // value for 'take'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFindProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, options);
      }
export function useFindProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, options);
        }
// @ts-ignore
export function useFindProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindProductsQuery, FindProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindProductsQuery, FindProductsQueryVariables>;
export function useFindProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindProductsQuery, FindProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindProductsQuery | undefined, FindProductsQueryVariables>;
export function useFindProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, options);
        }
export type FindProductsQueryHookResult = ReturnType<typeof useFindProductsQuery>;
export type FindProductsLazyQueryHookResult = ReturnType<typeof useFindProductsLazyQuery>;
export type FindProductsSuspenseQueryHookResult = ReturnType<typeof useFindProductsSuspenseQuery>;
export type FindProductsQueryResult = ApolloReactCommon.QueryResult<FindProductsQuery, FindProductsQueryVariables>;
export const ScrollProductsDocument = gql`
    query ScrollProducts($scrollId: String) {
  scrollProducts(scrollId: $scrollId) {
    products {
      ...Product
    }
    productsCount
    scrollId
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;

/**
 * __useScrollProductsQuery__
 *
 * To run a query within a React component, call `useScrollProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrollProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrollProductsQuery({
 *   variables: {
 *      scrollId: // value for 'scrollId'
 *   },
 * });
 */
export function useScrollProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ScrollProductsQuery, ScrollProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ScrollProductsQuery, ScrollProductsQueryVariables>(ScrollProductsDocument, options);
      }
export function useScrollProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ScrollProductsQuery, ScrollProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ScrollProductsQuery, ScrollProductsQueryVariables>(ScrollProductsDocument, options);
        }
// @ts-ignore
export function useScrollProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ScrollProductsQuery, ScrollProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ScrollProductsQuery, ScrollProductsQueryVariables>;
export function useScrollProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ScrollProductsQuery, ScrollProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ScrollProductsQuery | undefined, ScrollProductsQueryVariables>;
export function useScrollProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ScrollProductsQuery, ScrollProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ScrollProductsQuery, ScrollProductsQueryVariables>(ScrollProductsDocument, options);
        }
export type ScrollProductsQueryHookResult = ReturnType<typeof useScrollProductsQuery>;
export type ScrollProductsLazyQueryHookResult = ReturnType<typeof useScrollProductsLazyQuery>;
export type ScrollProductsSuspenseQueryHookResult = ReturnType<typeof useScrollProductsSuspenseQuery>;
export type ScrollProductsQueryResult = ApolloReactCommon.QueryResult<ScrollProductsQuery, ScrollProductsQueryVariables>;
export const FindOneProductDocument = gql`
    query FindOneProduct($id: String) {
  findOneProduct(id: $id) {
    ...Product
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;

/**
 * __useFindOneProductQuery__
 *
 * To run a query within a React component, call `useFindOneProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneProductQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneProductQuery, FindOneProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindOneProductQuery, FindOneProductQueryVariables>(FindOneProductDocument, options);
      }
export function useFindOneProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneProductQuery, FindOneProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindOneProductQuery, FindOneProductQueryVariables>(FindOneProductDocument, options);
        }
// @ts-ignore
export function useFindOneProductSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindOneProductQuery, FindOneProductQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindOneProductQuery, FindOneProductQueryVariables>;
export function useFindOneProductSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindOneProductQuery, FindOneProductQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindOneProductQuery | undefined, FindOneProductQueryVariables>;
export function useFindOneProductSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindOneProductQuery, FindOneProductQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindOneProductQuery, FindOneProductQueryVariables>(FindOneProductDocument, options);
        }
export type FindOneProductQueryHookResult = ReturnType<typeof useFindOneProductQuery>;
export type FindOneProductLazyQueryHookResult = ReturnType<typeof useFindOneProductLazyQuery>;
export type FindOneProductSuspenseQueryHookResult = ReturnType<typeof useFindOneProductSuspenseQuery>;
export type FindOneProductQueryResult = ApolloReactCommon.QueryResult<FindOneProductQuery, FindOneProductQueryVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    ...Product
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: String!, $data: UpdateProductInput!) {
  updateProduct(id: $id, data: $data) {
    ...Product
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;
export type UpdateProductMutationFn = ApolloReactCommon.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = ApolloReactCommon.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: String!) {
  deleteProduct(id: $id) {
    ...Product
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;
export type DeleteProductMutationFn = ApolloReactCommon.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = ApolloReactCommon.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteVariantDocument = gql`
    mutation DeleteVariant($id: String!, $variantId: String!) {
  deleteVariant(id: $id, variantId: $variantId) {
    ...Product
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;
export type DeleteVariantMutationFn = ApolloReactCommon.MutationFunction<DeleteVariantMutation, DeleteVariantMutationVariables>;

/**
 * __useDeleteVariantMutation__
 *
 * To run a mutation, you first call `useDeleteVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVariantMutation, { data, loading, error }] = useDeleteVariantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useDeleteVariantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteVariantMutation, DeleteVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteVariantMutation, DeleteVariantMutationVariables>(DeleteVariantDocument, options);
      }
export type DeleteVariantMutationHookResult = ReturnType<typeof useDeleteVariantMutation>;
export type DeleteVariantMutationResult = ApolloReactCommon.MutationResult<DeleteVariantMutation>;
export type DeleteVariantMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteVariantMutation, DeleteVariantMutationVariables>;
export const UpdateVariantDocument = gql`
    mutation UpdateVariant($id: String!, $variantId: String!, $data: UpdateVariantInput!) {
  updateVariant(id: $id, variantId: $variantId, data: $data) {
    ...Product
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;
export type UpdateVariantMutationFn = ApolloReactCommon.MutationFunction<UpdateVariantMutation, UpdateVariantMutationVariables>;

/**
 * __useUpdateVariantMutation__
 *
 * To run a mutation, you first call `useUpdateVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVariantMutation, { data, loading, error }] = useUpdateVariantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      variantId: // value for 'variantId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateVariantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateVariantMutation, UpdateVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateVariantMutation, UpdateVariantMutationVariables>(UpdateVariantDocument, options);
      }
export type UpdateVariantMutationHookResult = ReturnType<typeof useUpdateVariantMutation>;
export type UpdateVariantMutationResult = ApolloReactCommon.MutationResult<UpdateVariantMutation>;
export type UpdateVariantMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateVariantMutation, UpdateVariantMutationVariables>;
export const AppendVariantDocument = gql`
    mutation AppendVariant($id: String!, $data: CreateVariantInput!) {
  appendVariant(id: $id, data: $data) {
    ...Product
  }
}
    ${ProductFragmentDoc}
${VariantFragmentDoc}`;
export type AppendVariantMutationFn = ApolloReactCommon.MutationFunction<AppendVariantMutation, AppendVariantMutationVariables>;

/**
 * __useAppendVariantMutation__
 *
 * To run a mutation, you first call `useAppendVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppendVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appendVariantMutation, { data, loading, error }] = useAppendVariantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAppendVariantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AppendVariantMutation, AppendVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AppendVariantMutation, AppendVariantMutationVariables>(AppendVariantDocument, options);
      }
export type AppendVariantMutationHookResult = ReturnType<typeof useAppendVariantMutation>;
export type AppendVariantMutationResult = ApolloReactCommon.MutationResult<AppendVariantMutation>;
export type AppendVariantMutationOptions = ApolloReactCommon.BaseMutationOptions<AppendVariantMutation, AppendVariantMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginUserInput!) {
  loginUser(data: $data) {
    user {
      ...User
    }
    accessToken
    refreshToken
  }
}
    ${UserFragmentDoc}`;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const FindMeDocument = gql`
    query FindMe {
  findMe {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useFindMeQuery__
 *
 * To run a query within a React component, call `useFindMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
      }
export function useFindMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
// @ts-ignore
export function useFindMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindMeQuery, FindMeQueryVariables>;
export function useFindMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindMeQuery | undefined, FindMeQueryVariables>;
export function useFindMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
export type FindMeQueryHookResult = ReturnType<typeof useFindMeQuery>;
export type FindMeLazyQueryHookResult = ReturnType<typeof useFindMeLazyQuery>;
export type FindMeSuspenseQueryHookResult = ReturnType<typeof useFindMeSuspenseQuery>;
export type FindMeQueryResult = ApolloReactCommon.QueryResult<FindMeQuery, FindMeQueryVariables>;
export const FindUsersDocument = gql`
    query FindUsers($skip: Int, $take: Int) {
  findUsers(skip: $skip, take: $take) {
    users {
      ...User
    }
    usersCount
  }
}
    ${UserFragmentDoc}`;

/**
 * __useFindUsersQuery__
 *
 * To run a query within a React component, call `useFindUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUsersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useFindUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindUsersQuery, FindUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindUsersQuery, FindUsersQueryVariables>(FindUsersDocument, options);
      }
export function useFindUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindUsersQuery, FindUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindUsersQuery, FindUsersQueryVariables>(FindUsersDocument, options);
        }
// @ts-ignore
export function useFindUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindUsersQuery, FindUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindUsersQuery, FindUsersQueryVariables>;
export function useFindUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindUsersQuery, FindUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindUsersQuery | undefined, FindUsersQueryVariables>;
export function useFindUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindUsersQuery, FindUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindUsersQuery, FindUsersQueryVariables>(FindUsersDocument, options);
        }
export type FindUsersQueryHookResult = ReturnType<typeof useFindUsersQuery>;
export type FindUsersLazyQueryHookResult = ReturnType<typeof useFindUsersLazyQuery>;
export type FindUsersSuspenseQueryHookResult = ReturnType<typeof useFindUsersSuspenseQuery>;
export type FindUsersQueryResult = ApolloReactCommon.QueryResult<FindUsersQuery, FindUsersQueryVariables>;
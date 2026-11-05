import type {
  FindProductsQueryVariables,
  FloatRangeInput,
  VariantFilterInput,
} from "@/graphql/generated";

export type ProductsFiltersProps = {
  variables: FindProductsQueryVariables;
  onChange?: (variables: FindProductsQueryVariables) => void;
};
export type ProductsFiltersFormData = {
  query?: string;
  filters?: {
    available?: boolean;
    characterstics?: {
      key: string;
      value: string;
    };
    deleted?: boolean;
    maxPrice?: FloatRangeInput;
    minPrice?: FloatRangeInput;
    variants?:
      | (Omit<VariantFilterInput, "characterstics"> & {
          characterstics?: {
            key: string;
            value: string;
          };
        })
      | null
      | undefined;
  };
};

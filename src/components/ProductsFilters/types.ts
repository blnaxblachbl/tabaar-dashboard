import type {
  FindProductsQueryVariables,
  FloatRangeInput,
  VariantFilterInput,
} from "@/graphql/generated";

export type ProductsFiltersProps = {
  variables: FindProductsQueryVariables;
  onChange?: (variables: FindProductsQueryVariables) => void;
  filtersVisible?: ProductsFiltersVisible;
};
export type ProductsFiltersVisible = {
  prodcuts?: {
    query?: boolean;
    available?: boolean;
    minPrice?: boolean;
    maxPrice?: boolean;
    characterstics?: boolean;
  };
  variants?: {
    currency?: boolean;
    price?: boolean;
    count?: boolean;
    characterstics?: boolean;
  };
};
export type ProductsFiltersFormData = {
  query?: string;
  filters?: {
    available?: boolean;
    characterstics?: {
      key: string;
      value: string;
    };
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

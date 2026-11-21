export type ApiKeyFiltersProps = {
  initialValues: ApiKeyFiltersData;
  onSubmit?: (values: ApiKeyFiltersData) => void;
};
export type ApiKeyFiltersData = {
  search?: string;
  expired?: boolean;
};

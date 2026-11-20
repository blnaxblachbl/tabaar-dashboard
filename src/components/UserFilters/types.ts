export type UserFiltersProps = {
  initialValues: UserFiltersData;
  onSubmit?: (values: UserFiltersData) => void;
};
export type UserFiltersData = {
  search?: string;
  deleted?: boolean;
};

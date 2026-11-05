import type { FormProps } from "antd";

export type UserFormData = {
  name: string;
  email: string;
};
export type UserFormProps = Omit<FormProps<UserFormData>, "initialValues"> & {
  initialValues?: UserFormData;
  loading?: boolean;
  submitText?: string;
};

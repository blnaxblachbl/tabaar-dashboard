import type { FormProps } from "antd";

export type ProductFormData = {
  name: string;
  description: string;
  characterstics?: {
    key: string;
    value: string;
  }[];
};
export type ProductFormProps = Omit<
  FormProps<ProductFormData>,
  "initialValues"
> & {
  loading?: boolean;
  initialValues?: ProductFormData;
  submitText?: string;
};

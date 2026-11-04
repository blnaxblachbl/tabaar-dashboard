import type { FormProps } from "antd";

export type VariantFormData = {
  count: number;
  price: number;
  currency: string;
  characterstics?: {
    key: string;
    value: string;
  }[];
};
export type VariantFormProps = Omit<
  FormProps<VariantFormData>,
  "initialValues"
> & {
  loading?: boolean;
  initialValues?: VariantFormData;
  submitText?: string;
};

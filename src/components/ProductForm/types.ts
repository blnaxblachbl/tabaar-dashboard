import type { LocaleContentFragment } from "@/graphql/generated";
import type { FormProps } from "antd";

export type ProductFormData = {
  name: LocaleContentFragment[];
  description: LocaleContentFragment[];
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

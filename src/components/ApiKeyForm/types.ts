import type { FormProps } from "antd";
import type { Dayjs } from "dayjs";

export type ApiKeyFormData = {
  name: string;
  expiredAt: Dayjs;
};

export type ApiKeyFormProps = Omit<
  FormProps<ApiKeyFormData>,
  "initialValues"
> & {
  initialValues?: ApiKeyFormData;
  loading?: boolean;
  submitText?: string;
};

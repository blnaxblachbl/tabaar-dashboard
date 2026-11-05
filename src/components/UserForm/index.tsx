import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import type { UserFormProps } from "./types";

export function UserForm({
  loading,
  submitText = "Submit",
  ...props
}: UserFormProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.user-form",
  });

  return (
    <Form layout="vertical" {...props}>
      <Form.Item
        name={"name"}
        label={t("name.label")}
        rules={[
          {
            required: true,
            message: t("name.errors.required"),
          },
          {
            type: "string",
            max: 100,
            message: t("name.errors.invalid"),
          },
        ]}
      >
        <Input placeholder="John Doe" />
      </Form.Item>
      <Form.Item
        name={"email"}
        label={t("email.label")}
        rules={[
          {
            required: true,
            message: t("email.errors.required"),
          },
          {
            type: "email",
            message: t("email.errors.invalid"),
          },
        ]}
      >
        <Input placeholder="john-doe@tabaar.com" />
      </Form.Item>
      <Button loading={loading} htmlType="submit" type="primary" block>
        {submitText}
      </Button>
    </Form>
  );
}

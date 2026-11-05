import { Button, DatePicker, Form, Input, Skeleton, Space } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import type { ApiKeyFormProps } from "./types";

export function ApiKeyForm({
  loading,
  initialValues,
  submitText = "Submit",
  ...props
}: ApiKeyFormProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.api-key-form",
  });

  return (
    <Form
      layout="vertical"
      initialValues={{
        expiredAt: dayjs().add(1, "month"),
        ...initialValues,
      }}
      {...props}
    >
      <Form.Item
        name={"name"}
        label={t("name.label")}
        rules={[
          {
            required: true,
            message: t("errors.required"),
          },
          {
            type: "string",
            min: 3,
            message: t("errors.invalid"),
          },
        ]}
      >
        <Input placeholder="My app API key..." />
      </Form.Item>
      <Form.Item
        name={"expiredAt"}
        label={t("expiration.label")}
        rules={[
          {
            required: true,
            message: t("expiration.errors.required"),
          },
        ]}
      >
        <DatePicker
          allowClear={false}
          minDate={dayjs().add(1, "hour")}
          maxDate={dayjs().add(90, "days")}
          className="w-full"
          showTime
        />
      </Form.Item>
      <Button loading={loading} htmlType="submit" type="primary" block>
        {submitText}
      </Button>
    </Form>
  );
}

export function ApiKeyFormSkeleton() {
  return (
    <Space size={"medium"} className="w-full!" vertical>
      <Space vertical className="w-full!">
        <Skeleton paragraph={false} className="w-1/5!" active />
        <Skeleton.Input block active />
      </Space>
      <Space vertical className="w-full!">
        <Skeleton paragraph={false} className="w-1/5!" active />
        <Skeleton.Input block active />
      </Space>
      <Skeleton.Button block active />
    </Space>
  );
}

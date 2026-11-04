import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Skeleton,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { VariantFormData, VariantFormProps } from "./types";
import { useTranslation } from "react-i18next";

export function VariantForm({
  loading,
  submitText,
  ...props
}: VariantFormProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.variant-form",
  });

  return (
    <Form<VariantFormData>
      classNames={{
        root: "max-w-md mx-auto!",
      }}
      layout="vertical"
      {...props}
    >
      <Form.Item
        name={"price"}
        label={t("price.label")}
        rules={[
          {
            required: true,
            message: t("price.errors.required"),
          },
          {
            type: "number",
            min: 0,
            message: t("price.errors.invalid"),
          },
        ]}
      >
        <InputNumber className="w-full!" min={0} placeholder={"100"} />
      </Form.Item>
      <Form.Item
        name={"count"}
        label={t("count.label")}
        rules={[
          {
            required: true,
            message: t("count.errors.required"),
          },
          {
            type: "number",
            min: 0,
            message: t("count.errors.invalid"),
          },
        ]}
      >
        <InputNumber className="w-full!" min={0} placeholder={"100"} />
      </Form.Item>
      <Form.Item
        name={"currency"}
        label={t("currency.label")}
        rules={[
          {
            required: true,
            message: t("currency.errors.required"),
          },
        ]}
      >
        <Input placeholder={"USD"} />
      </Form.Item>
      <Form.Item label={t("characterstics.label")}>
        <Form.List name="characterstics">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={6}>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[
                        {
                          required: true,
                          message: t("characterstics.key.errors.required"),
                        },
                        {
                          type: "string",
                          min: 1,
                          max: 100,
                          message: t("characterstics.key.errors.invalid"),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("characterstics.key.placeholder")}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        {
                          required: true,
                          message: t("characterstics.value.errors.required"),
                        },
                        {
                          type: "string",
                          min: 1,
                          max: 100,
                          message: t("characterstics.value.errors.invalid"),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("characterstics.value.placeholder")}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      danger
                      block
                    />
                  </Col>
                </Row>
              ))}
              <Button block onClick={add} icon={<PlusOutlined />}>
                {t("characterstics.add")}
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Button htmlType="submit" type="primary" block loading={loading}>
        {submitText ?? t("create-button.text")}
      </Button>
    </Form>
  );
}

export function VariantFormSkeleton() {
  return (
    <Space vertical className="w-full" size={"medium"}>
      <Space vertical className="w-full!">
        <Skeleton paragraph={false} className="w-1/5!" active />
        <Skeleton.Input block active />
      </Space>
      <Space vertical className="w-full!">
        <Skeleton paragraph={false} className="w-1/5!" active />
        <Skeleton.Input block active />
      </Space>
      <Space vertical className="w-full!">
        <Skeleton paragraph={false} className="w-1/5!" active />
        <Skeleton.Input block active />
      </Space>
      <Skeleton.Button block active />
      <Skeleton.Button block active />
    </Space>
  );
}

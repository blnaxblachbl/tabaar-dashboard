import { Button, Col, Form, Input, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { ProductFormData, ProductFormProps } from "./types";
import { useTranslation } from "react-i18next";

export function ProductForm({
  loading,
  submitText,
  ...props
}: ProductFormProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.product-form",
  });

  return (
    <Form<ProductFormData>
      classNames={{
        root: "max-w-md mx-auto!",
      }}
      layout="vertical"
      {...props}
    >
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
            min: 3,
            max: 100,
            message: t("name.errors.invalid"),
          },
        ]}
      >
        <Input placeholder={t("name.placeholder")} />
      </Form.Item>
      <Form.Item
        name={"description"}
        label={t("description.label")}
        rules={[
          {
            required: true,
            message: t("description.errors.required"),
          },
          {
            type: "string",
            min: 3,
            max: 1500,
            message: t("description.errors.invalid"),
          },
        ]}
      >
        <Input.TextArea placeholder={t("description.placeholder")} rows={5} />
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

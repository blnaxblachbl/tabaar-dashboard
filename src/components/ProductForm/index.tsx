import { Button, Col, Form, Input, Row, Select, Skeleton, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { ProductFormData, ProductFormProps } from "./types";
import { useTranslation } from "react-i18next";
import { Language } from "@/libs/i18n/types";

export function ProductForm({
  loading,
  submitText,
  ...props
}: ProductFormProps) {
  const { t, i18n } = useTranslation("", {
    keyPrefix: "components.product-form",
  });

  const localeOptions = Object.values(Language).map((key) => ({
    label: key.toUpperCase(),
    value: key,
  }));

  return (
    <Form<ProductFormData>
      classNames={{
        root: "max-w-md mx-auto!",
      }}
      initialValues={{
        name: [
          {
            content: "",
            locale: i18n.language,
          },
        ],
        description: [
          {
            content: "",
            locale: i18n.language,
          },
        ],
      }}
      layout="vertical"
      {...props}
    >
      <Form.Item label={t("name.label")} required>
        <Form.List name={"name"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Space.Compact className="w-full!">
                    <Form.Item
                      name={[field.name, "locale"]}
                      className="w-20! mb-3!"
                    >
                      <Select options={localeOptions} />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "content"]}
                      className="w-full! mb-3!"
                      rules={[
                        {
                          required: true,
                          message: t("name.errors.required"),
                        },
                        {
                          type: "string",
                          min: 3,
                          max: 1500,
                          message: t("name.errors.invalid"),
                        },
                      ]}
                    >
                      <Input placeholder={t("name.placeholder")} />
                    </Form.Item>
                    <Button
                      onClick={() => remove(index)}
                      type="text"
                      icon={<MinusCircleOutlined />}
                      disabled={fields.length <= 1}
                      danger
                    />
                  </Space.Compact>
                </div>
              ))}
              <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
                onClick={() => add({ content: "", locale: i18n.language })}
              >
                {t("name.add")}
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label={t("description.label")} required>
        <Form.List name={"description"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space.Compact key={field.key} className="w-full!">
                  <Form.Item
                    name={[field.name, "locale"]}
                    className="w-20! mb-3!"
                  >
                    <Select options={localeOptions} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "content"]}
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
                    className="w-full!"
                  >
                    <Input.TextArea
                      placeholder={t("description.placeholder")}
                      rows={5}
                    />
                  </Form.Item>
                  <Button
                    onClick={() => remove(index)}
                    type="text"
                    icon={<MinusCircleOutlined />}
                    disabled={fields.length <= 1}
                    danger
                  />
                </Space.Compact>
              ))}
              <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
                onClick={() => add({ content: "", locale: i18n.language })}
              >
                {t("description.add")}
              </Button>
            </>
          )}
        </Form.List>
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

export function ProductFormSkeleton() {
  return (
    <Space vertical className="w-full">
      <Skeleton paragraph={false} className="w-1/5!" active />
      <Skeleton.Input block active />
      <Skeleton paragraph={false} className="w-1/5!" active />
      <Skeleton.Input
        block
        classNames={{ root: "h-30", content: "h-full!" }}
        active
      />
      <Skeleton.Button block active />
      <Skeleton.Button block active />
    </Space>
  );
}

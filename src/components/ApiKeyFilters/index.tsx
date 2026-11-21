import {
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Badge,
  Button,
  Space,
  Select,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import type { ApiKeyFiltersProps } from "./types";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function CollapsibleApiKeyFilters({
  initialValues,
  ...props
}: ApiKeyFiltersProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.api-key-filters",
  });
  const filtersCount = useMemo(() => {
    let count = 0;
    if (initialValues.expired) {
      count++;
    }
    if (initialValues.search) {
      count++;
    }
    return count;
  }, [initialValues.expired, initialValues.search]);

  return (
    <Collapse
      items={[
        {
          key: 0,
          label: t("title"),
          children: <ApiKeyFilters initialValues={initialValues} {...props} />,
          classNames: {
            body: "bg-transparent!",
          },
          extra: (
            <Badge count={filtersCount} size="small">
              <FilterOutlined />
            </Badge>
          ),
        },
      ]}
    />
  );
}

export function ApiKeyFilters({
  initialValues,
  onSubmit = () => {},
}: ApiKeyFiltersProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.api-key-filters",
  });

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);

  return (
    <Form
      form={form}
      initialValues={{
        expired: false,
      }}
      onFinish={onSubmit}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            name="search"
            label={t("search.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Input
              placeholder={t("search.placeholder")}
              onChange={(e) => {
                if (!e.currentTarget.value) {
                  form.submit();
                }
              }}
              allowClear
              onClear={form.submit}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            name="expired"
            label={t("status.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Select
              options={[
                {
                  label: t("status.options.expired"),
                  value: true,
                },
                {
                  label: t("status.options.not-expired"),
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <div className="flex justify-end items-end h-full">
            <Space.Compact rootClassName="w-full md:max-w-md!">
              <Button disabled={false} onClick={resetFilters} block>
                {t("reset-button.text")}
              </Button>
              <Button htmlType="submit" type={"primary"} block>
                {t("submit-button.text")}
              </Button>
            </Space.Compact>
          </div>
        </Col>
      </Row>
    </Form>
  );
  function resetFilters() {
    form.resetFields();
    onSubmit({});
  }
}

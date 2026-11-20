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
import type { UserFiltersProps } from "./types";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function CollapsibleUserFilters({
  initialValues,
  ...props
}: UserFiltersProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.user-filters",
  });
  const filtersCount = useMemo(() => {
    let count = 0;
    if (initialValues.deleted) {
      count++;
    }
    if (initialValues.search) {
      count++;
    }
    return count;
  }, [initialValues.deleted, initialValues.search]);

  return (
    <Collapse
      items={[
        {
          key: 0,
          label: t("title"),
          children: <UserFilters initialValues={initialValues} {...props} />,
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

export function UserFilters({
  initialValues,
  onSubmit = () => {},
}: UserFiltersProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.user-filters",
  });

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);

  return (
    <Form
      form={form}
      initialValues={{
        deleted: false,
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
            name="deleted"
            label={t("status.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Select
              options={[
                {
                  label: t("status.options.deleted"),
                  value: true,
                },
                {
                  label: t("status.options.not-deleted"),
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

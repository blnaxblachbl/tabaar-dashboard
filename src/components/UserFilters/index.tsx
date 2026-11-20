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

export function CollapsibleUserFilters({
  initialValues,
  ...props
}: UserFiltersProps) {
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
          label: "Users Filter",
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
            label="Search"
            layout="vertical"
            rootClassName="m-0!"
          >
            <Input
              placeholder="Email or Name"
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
            label="Status"
            layout="vertical"
            rootClassName="m-0!"
          >
            <Select
              options={[
                {
                  label: "Deleted",
                  value: true,
                },
                {
                  label: "Active",
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
                Reset
              </Button>
              <Button htmlType="submit" type={"primary"} block>
                Submit
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

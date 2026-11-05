import { useEffect, useMemo } from "react";
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Badge,
  Divider,
} from "antd";
import { FilterOutlined, MinusOutlined } from "@ant-design/icons";

import type {
  FiltersInput,
  FindProductsQueryVariables,
} from "@/graphql/generated";
import type { ProductsFiltersProps, ProductsFiltersFormData } from "./types";
import {
  parseCharacteristics,
  createFormCharacteristics,
} from "@/utils/product/parseFormData";

function getFiltersCount(variables: FindProductsQueryVariables) {
  let count = 0;
  if (variables.query) {
    count++;
  }
  if (variables.filters) {
    if (typeof variables.filters.available === "boolean") {
      count++;
    }
    if (variables.filters.deleted) {
      count++;
    }
    if (Object.keys(variables.filters.minPrice ?? {}).length > 0) {
      count++;
    }
    if (Object.keys(variables.filters.maxPrice ?? {}).length > 0) {
      count++;
    }
    if (Object.keys(variables.filters.characterstics ?? {}).length > 0) {
      count++;
    }
    if (Object.keys(variables.filters.variants?.price ?? {}).length > 0) {
      count++;
    }
    if (Object.keys(variables.filters.variants?.count ?? {}).length > 0) {
      count++;
    }
    if (
      Object.keys(variables.filters.variants?.characterstics ?? {}).length > 0
    ) {
      count++;
    }
    if (variables.filters.variants?.currency) {
      count++;
    }
  }
  return count;
}

export function CollapsibleProductsFilters({
  variables,
  ...props
}: ProductsFiltersProps) {
  const filtersCount = useMemo(() => getFiltersCount(variables), [variables]);
  return (
    <Collapse
      defaultActiveKey={filtersCount ? [0] : []}
      items={[
        {
          key: 0,
          label: "Filters",
          children: <ProductsFilters variables={variables} {...props} />,
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

export function ProductsFilters({
  variables,
  onChange = () => {},
}: ProductsFiltersProps) {
  const filtersCount = useMemo(() => getFiltersCount(variables), [variables]);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...variables,
      filters: {
        deleted: false,
        ...variables.filters,
        characterstics: variables.filters?.characterstics
          ? createFormCharacteristics(variables.filters?.characterstics)[0]
          : undefined,
        variants: {
          ...variables.filters?.variants,
          characterstics: variables.filters?.variants?.characterstics
            ? createFormCharacteristics(
                variables.filters?.variants?.characterstics,
              )[0]
            : undefined,
        },
      },
    });
  }, []);

  return (
    <Form
      initialValues={{
        filters: {
          deleted: false,
        },
      }}
      form={form}
      onFinish={onSubmit}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Divider size="small">Product Filters</Divider>
        </Col>
        <Col span={8}>
          <Form.Item
            name="query"
            label="Search"
            layout="vertical"
            rootClassName="m-0!"
          >
            <Input
              placeholder="T-shirt"
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
        <Col span={8}>
          <Form.Item
            label="Availability"
            name={["filters", "available"]}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Select
              placeholder="Select Availability"
              options={[
                {
                  label: "Available",
                  value: true,
                },
                {
                  label: "Not Available",
                  value: false,
                },
              ]}
              allowClear
              onChange={form.submit}
              onClear={form.submit}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["filters", "deleted"]}
            label="Deleted"
            layout="vertical"
            rootClassName="m-0!"
          >
            <Select
              placeholder="Select Deleted"
              options={[
                {
                  label: "Deleted",
                  value: true,
                },
                {
                  label: "Not Deleted",
                  value: false,
                },
              ]}
              onChange={form.submit}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Min Price" layout="vertical" rootClassName="m-0!">
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "minPrice", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder="From"
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "minPrice", "lte"]} noStyle>
                <InputNumber min={0} placeholder="To" rootClassName="w-full!" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Max Price" layout="vertical" rootClassName="m-0!">
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "maxPrice", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder="From"
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "maxPrice", "lte"]} noStyle>
                <InputNumber min={0} placeholder="To" rootClassName="w-full!" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Characterstics"
            layout="vertical"
            rootClassName="m-0!"
          >
            <Space.Compact>
              <Form.Item
                name={["filters", "characterstics", "key"]}
                noStyle
                rules={[
                  {
                    validator: (_, value: string | undefined) => {
                      return charValidator(value, "value", "Key is required");
                    },
                  },
                ]}
              >
                <Input placeholder="Key" />
              </Form.Item>
              <Button className="pointer-events-none! text-xs!">:</Button>
              <Form.Item
                name={["filters", "characterstics", "value"]}
                noStyle
                rules={[
                  {
                    validator: (_, value: string | undefined) => {
                      return charValidator(value, "key", "Value is required");
                    },
                  },
                ]}
              >
                <Input placeholder="Value" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={24} className="mt-3">
          <Divider size="small">Variants Filters</Divider>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["filters", "variants", "currency"]}
            label="Currency"
            layout="vertical"
            rootClassName="m-0!"
          >
            <Input
              placeholder="USD"
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
        <Col span={8}>
          <Form.Item label="Price" layout="vertical" rootClassName="m-0!">
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "variants", "price", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder="From"
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "variants", "price", "lte"]} noStyle>
                <InputNumber min={0} placeholder="To" rootClassName="w-full!" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Count" layout="vertical" rootClassName="m-0!">
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "variants", "count", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder="From"
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "variants", "count", "lte"]} noStyle>
                <InputNumber min={0} placeholder="To" rootClassName="w-full!" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Characterstics"
            layout="vertical"
            rootClassName="m-0!"
          >
            <Space.Compact>
              <Form.Item
                name={["filters", "variants", "characterstics", "key"]}
                noStyle
                rules={[
                  {
                    validator: (_, value: string | undefined) => {
                      return charValidator(value, "value", "Key is required");
                    },
                  },
                ]}
              >
                <Input placeholder="Key" />
              </Form.Item>
              <Button className="pointer-events-none! text-xs!">:</Button>
              <Form.Item
                name={["filters", "variants", "characterstics", "value"]}
                noStyle
                rules={[
                  {
                    validator: (_, value: string | undefined) => {
                      return charValidator(value, "key", "Value is required");
                    },
                  },
                ]}
              >
                <Input placeholder="Value" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={8} offset={16}>
          <Space.Compact rootClassName="w-full!">
            <Button disabled={filtersCount === 0} onClick={resetFilters} block>
              Reset
            </Button>
            <Button htmlType="submit" type={"primary"} block>
              Submit
            </Button>
          </Space.Compact>
        </Col>
      </Row>
    </Form>
  );
  function onSubmit({ filters, query }: ProductsFiltersFormData) {
    const filtersInput: FiltersInput = {};
    if (filters) {
      if (typeof filters.available === "boolean") {
        filtersInput.available = filters.available;
      }
      if (filters.deleted) {
        filtersInput.deleted = filters.deleted;
      }
      if (filters.maxPrice?.gte || filters.maxPrice?.lte) {
        filtersInput.maxPrice = filters.maxPrice;
      }
      if (filters.minPrice?.gte || filters.minPrice?.lte) {
        filtersInput.minPrice = filters.minPrice;
      }
      if (filters.characterstics?.key && filters.characterstics.value) {
        filtersInput.characterstics = parseCharacteristics([
          filters.characterstics,
        ]);
      }
      if (filters.variants) {
        const { variants } = filters;
        if (variants.currency) {
          if (!filtersInput.variants) {
            filtersInput.variants = {};
          }
          filtersInput.variants.currency = variants.currency;
        }
        if (variants.price?.gte || variants.price?.lte) {
          if (!filtersInput.variants) {
            filtersInput.variants = {};
          }
          filtersInput.variants.price = variants.price;
        }
        if (variants.count?.gte || variants.count?.lte) {
          if (!filtersInput.variants) {
            filtersInput.variants = {};
          }
          filtersInput.variants.count = variants.count;
        }
        if (
          (variants.characterstics && variants.characterstics?.key) ||
          variants.characterstics?.value
        ) {
          if (!filtersInput.variants) {
            filtersInput.variants = {};
          }
          filtersInput.variants.characterstics = parseCharacteristics([
            variants.characterstics,
          ]);
        }
      }
    }
    onChange({
      query,
      filters: filtersInput,
    });
  }
  function resetFilters() {
    form.resetFields();
    onChange({
      query: undefined,
      filters: undefined,
    });
  }
  function charValidator(
    value: string | undefined,
    peerKey: string,
    errorText: string,
  ): Promise<string | void> {
    if (!value && form.getFieldValue(["filters", "characterstics", peerKey])) {
      return Promise.reject(errorText);
    }
    return Promise.resolve();
  }
}

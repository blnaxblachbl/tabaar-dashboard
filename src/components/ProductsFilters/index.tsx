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
import { useTranslation } from "react-i18next";

import type {
  FiltersInput,
  FindProductsQueryVariables,
} from "@/graphql/generated";
import {
  parseCharacteristics,
  createFormCharacteristics,
} from "@/utils/product/parseFormData";
import type { ProductsFiltersProps, ProductsFiltersFormData } from "./types";

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
  const { t } = useTranslation("", {
    keyPrefix: "components.products-filteres",
  });
  return (
    <Collapse
      defaultActiveKey={filtersCount ? [0] : []}
      items={[
        {
          key: 0,
          label: t("title"),
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
  const { t } = useTranslation("", {
    keyPrefix: "components.products-filteres",
  });

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
          <Divider size="small">{t("products.title")}</Divider>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            name="query"
            label={t("products.query.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Input
              placeholder={t("products.query.placeholder")}
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
            label={t("products.availability.label")}
            name={["filters", "available"]}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Select
              placeholder={t("products.availability.placeholder")}
              options={[
                {
                  label: t("products.availability.options.available"),
                  value: true,
                },
                {
                  label: t("products.availability.options.not-available"),
                  value: false,
                },
              ]}
              allowClear
              onChange={form.submit}
              onClear={form.submit}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            name={["filters", "deleted"]}
            label={t("products.deleted.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Select
              placeholder={t("products.deleted.placeholder")}
              options={[
                {
                  label: t("products.deleted.options.deleted"),
                  value: true,
                },
                {
                  label: t("products.deleted.options.not-deleted"),
                  value: false,
                },
              ]}
              onChange={form.submit}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label={t("products.min-price.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "minPrice", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("products.min-price.placeholder-from")}
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "minPrice", "lte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("products.min-price.placeholder-to")}
                  rootClassName="w-full!"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label={t("products.max-price.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "maxPrice", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("products.max-price.placeholder-from")}
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "maxPrice", "lte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("products.max-price.placeholder-to")}
                  rootClassName="w-full!"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label={t("products.characterstics.label")}
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
                      return charValidator(
                        value,
                        "value",
                        t("products.characterstics.errors.key-required"),
                      );
                    },
                  },
                ]}
              >
                <Input
                  placeholder={t("products.characterstics.placeholder-key")}
                />
              </Form.Item>
              <Button className="pointer-events-none! text-xs!">:</Button>
              <Form.Item
                name={["filters", "characterstics", "value"]}
                noStyle
                rules={[
                  {
                    validator: (_, value: string | undefined) => {
                      return charValidator(
                        value,
                        "key",
                        t("products.characterstics.errors.value-required"),
                      );
                    },
                  },
                ]}
              >
                <Input
                  placeholder={t("products.characterstics.placeholder-value")}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={24} className="mt-3">
          <Divider size="small">{t("variants.title")}</Divider>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            name={["filters", "variants", "currency"]}
            label={t("variants.currency.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Input
              placeholder={t("variants.currency.placeholder")}
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
            label={t("variants.price.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "variants", "price", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("variants.price.placeholder-from")}
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "variants", "price", "lte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("variants.price.placeholder-to")}
                  rootClassName="w-full!"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label={t("variants.count.label")}
            layout="vertical"
            rootClassName="m-0!"
          >
            <Space.Compact rootClassName="w-full!">
              <Form.Item name={["filters", "variants", "count", "gte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("variants.count.placeholder-to")}
                  rootClassName="w-full!"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                className="pointer-events-none! text-xs!"
              />
              <Form.Item name={["filters", "variants", "count", "lte"]} noStyle>
                <InputNumber
                  min={0}
                  placeholder={t("variants.count.placeholder-to")}
                  rootClassName="w-full!"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label={t("products.characterstics.label")}
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
                      return variantCharValidator(
                        value,
                        "value",
                        t("variants.characterstics.errors.key-required"),
                      );
                    },
                  },
                ]}
              >
                <Input
                  placeholder={t("products.characterstics.placeholder-key")}
                />
              </Form.Item>
              <Button className="pointer-events-none! text-xs!">:</Button>
              <Form.Item
                name={["filters", "variants", "characterstics", "value"]}
                noStyle
                rules={[
                  {
                    validator: (_, value: string | undefined) => {
                      return variantCharValidator(
                        value,
                        "key",
                        t("variants.characterstics.errors.value-required"),
                      );
                    },
                  },
                ]}
              >
                <Input
                  placeholder={t("products.characterstics.placeholder-value")}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className="flex justify-end">
            <Space.Compact rootClassName="w-full md:max-w-md!">
              <Button
                disabled={filtersCount === 0}
                onClick={resetFilters}
                block
              >
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
  function variantCharValidator(
    value: string | undefined,
    peerKey: string,
    errorText: string,
  ): Promise<string | void> {
    if (
      !value &&
      form.getFieldValue(["filters", "variants", "characterstics", peerKey])
    ) {
      return Promise.reject(errorText);
    }
    return Promise.resolve();
  }
}

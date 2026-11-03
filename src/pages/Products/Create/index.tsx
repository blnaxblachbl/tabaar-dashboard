import { Divider, Form, message } from "antd";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { ProductForm } from "@/components/ProductForm";
import type { ProductFormData } from "@/components/ProductForm/types";
import { useCreateProductMutation } from "@/graphql/generated";
import { parseCharacteristics } from "@/utils/product/parseFormData";
import { appentProduct } from "@/utils/product/updateQuery";

export default function CreateProductPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.create-product",
  });
  const [messageApi, messageContext] = message.useMessage();
  const [form] = Form.useForm();

  const [createProduct, { loading }] = useCreateProductMutation({
    onCompleted() {
      messageApi.success(t("toasts.success"));
      form.resetFields();
    },
    onError() {
      messageApi.error(t("toasts.error"));
    },
    update(client, { data }) {
      if (!data) {
        return;
      }
      appentProduct({
        client,
        newProduct: data.createProduct,
      });
    },
  });

  return (
    <PageLayout>
      {messageContext}
      <Title title={t("title")} />
      <Divider />
      <ProductForm
        form={form}
        onFinish={onSubmit}
        loading={loading}
        submitText={t("submit-button.text")}
      />
    </PageLayout>
  );
  function onSubmit(values: ProductFormData) {
    const characterstics = parseCharacteristics(values.characterstics);
    createProduct({
      variables: {
        data: {
          ...values,
          characterstics,
        },
      },
    });
  }
}

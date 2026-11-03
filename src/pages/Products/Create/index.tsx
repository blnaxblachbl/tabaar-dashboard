import { Divider } from "antd";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { ProductForm } from "@/components/ProductForm";
import type { ProductFormData } from "@/components/ProductForm/types";
import { useCreateProductMutation } from "@/graphql/generated";
import { parseCharacteristics } from "@/utils/product/parseFormData";

export default function CreateProductPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.create-product",
  });
  const [createProduct, { loading }] = useCreateProductMutation();

  return (
    <PageLayout>
      <Title title={t("title")} />
      <Divider />
      <ProductForm
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

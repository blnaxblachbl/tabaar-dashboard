import { Divider, Empty } from "antd";
import { useParams } from "react-router";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { useFindOneProductQuery } from "@/graphql/generated";
import { ProductForm } from "@/components/ProductForm";
import { createFormCharacteristics } from "@/utils/product/parseFormData";
import { useTranslation } from "react-i18next";

export default function EditProductPage() {
  const { productId } = useParams();
  const { t } = useTranslation("", {
    keyPrefix: "pages.edit-product",
  });

  const { data } = useFindOneProductQuery({
    variables: { id: productId },
  });

  const product = data?.findOneProduct;

  if (!product) {
    return <Empty description="Product not found" />;
  }

  return (
    <PageLayout>
      <Title title={t("title")} />
      <Divider />
      <ProductForm
        initialValues={{
          name: product.name,
          description: product.description,
          characterstics: createFormCharacteristics(
            product.characterstics ?? {},
          ),
        }}
        submitText={t("submit-button.text")}
      />
    </PageLayout>
  );
}

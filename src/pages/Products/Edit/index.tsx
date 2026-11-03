import { Button, Divider, Empty, message } from "antd";
import { useParams } from "react-router";
import { Link } from "react-router";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import {
  useFindOneProductQuery,
  useUpdateProductMutation,
} from "@/graphql/generated";
import { ProductForm, ProductFormSkeleton } from "@/components/ProductForm";
import {
  createFormCharacteristics,
  parseCharacteristics,
} from "@/utils/product/parseFormData";
import { useTranslation } from "react-i18next";
import type { ProductFormData } from "@/components/ProductForm/types";

export default function EditProductPage() {
  const { productId } = useParams();
  const { t } = useTranslation("", {
    keyPrefix: "pages.edit-product",
  });
  const [messageApi, messageContext] = message.useMessage();

  const [updateProduct, { loading: updateLoading }] = useUpdateProductMutation({
    onCompleted: () => {
      messageApi.success(t("toasts.success"));
    },
    onError: () => {
      messageApi.error(t("toasts.error"));
    },
  });

  const { data, loading: productLoading } = useFindOneProductQuery({
    variables: { id: productId },
  });

  const product = data?.findOneProduct;
  // const variants = product?.variants ?? [];

  return (
    <PageLayout>
      {messageContext}
      <Title title={t("title")} />
      <Divider />
      {productLoading && (
        <div className="max-w-md mx-auto">
          <ProductFormSkeleton />
        </div>
      )}
      {product ? (
        <ProductForm
          initialValues={{
            name: product.name,
            description: product.description,
            characterstics: createFormCharacteristics(
              product.characterstics ?? {},
            ),
          }}
          submitText={t("submit-button.text")}
          loading={updateLoading}
          onFinish={onSubmit}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t("empty.description")}
        >
          <Link to="/products">
            <Button>{t("empty.button.text")}</Button>
          </Link>
        </Empty>
      )}
      <Title title={t("variants")} className="mt-6" />
      <Divider />
    </PageLayout>
  );
  function onSubmit(values: ProductFormData) {
    if (!productId) {
      return;
    }
    const characterstics = parseCharacteristics(values.characterstics);
    updateProduct({
      variables: {
        id: productId,
        data: { ...values, characterstics },
      },
    });
  }
}

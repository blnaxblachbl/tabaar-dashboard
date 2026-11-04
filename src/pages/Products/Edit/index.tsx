import { Button, Divider, Empty, message, Popconfirm } from "antd";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import {
  useDeleteProductMutation,
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
import { deleteProduct } from "@/utils/product/updateQuery";
import { VariantsTable } from "@/components/VariantsTable";

export default function EditProductPage() {
  const { productId } = useParams();
  const { t } = useTranslation("", {
    keyPrefix: "pages.edit-product",
  });
  const [messageApi, messageContext] = message.useMessage();
  const navigate = useNavigate();

  const [updateProduct, { loading: updateLoading }] = useUpdateProductMutation({
    onCompleted: () => {
      messageApi.success(t("toasts.success"));
    },
    onError: () => {
      messageApi.error(t("toasts.error"));
    },
  });

  const [deltetProduct, { loading: deleteLoading }] = useDeleteProductMutation({
    onCompleted: () => {
      messageApi.success(t("toasts.delete.success"));
      navigate("/products");
    },
    onError: () => {
      messageApi.error(t("toasts.delete.error"));
    },
    update: (client) => {
      if (!productId) {
        return;
      }
      deleteProduct({
        client,
        deletedProductId: productId,
      });
    },
  });

  const { data, loading: productLoading } = useFindOneProductQuery({
    variables: { id: productId },
  });

  const product = data?.findOneProduct;
  const variants = product?.variants ?? [];

  return (
    <PageLayout>
      {messageContext}
      <Title
        title={t("title")}
        actions={
          <Popconfirm
            title={t("delete.title")}
            okText={t("delete.okText")}
            cancelText={t("delete.cancelText")}
            onConfirm={deltetProduct.bind(null, {
              variables: { id: productId ?? "" },
            })}
            disabled={deleteLoading}
          >
            <Button loading={deleteLoading} danger>
              {t("delete.button.text")}
            </Button>
          </Popconfirm>
        }
      />
      <Divider />
      {productLoading && (
        <div className="max-w-md mx-auto">
          <ProductFormSkeleton />
        </div>
      )}
      {!productLoading && product ? (
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
      ) : null}
      {!productLoading && !product ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t("empty.description")}
        >
          <Link to="/products">
            <Button>{t("empty.button.text")}</Button>
          </Link>
        </Empty>
      ) : null}
      {productId && (
        <div className="mt-6">
          <VariantsTable dataSource={variants} productId={productId} />
        </div>
      )}
    </PageLayout>
  );
  function onSubmit(values: ProductFormData) {
    if (!productId) {
      return;
    }
    const characterstics = parseCharacteristics(values.characterstics ?? []);
    updateProduct({
      variables: {
        id: productId,
        data: { ...values, characterstics },
      },
    });
  }
}

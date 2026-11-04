import { useParams } from "react-router";
import { Divider, Empty, Form, message, Skeleton } from "antd";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { VariantForm, VariantFormSkeleton } from "@/components/VariantForm";
import {
  useFindOneProductQuery,
  useUpdateVariantMutation,
  type FindOneProductQueryVariables,
} from "@/graphql/generated";
import {
  createFormCharacteristics,
  parseCharacteristics,
} from "@/utils/product/parseFormData";
import type { VariantFormData } from "@/components/VariantForm/types";
import { UploadVariantImage } from "@/components/UploadVariantImage";
import { useTranslation } from "react-i18next";

export default function VariantPage() {
  const { variantId, productId } = useParams();
  const [messageApi, messageContext] = message.useMessage();
  const { t } = useTranslation("", {
    keyPrefix: "pages.edit-variant",
  });

  const [updateVariant, { loading: updateLoading }] = useUpdateVariantMutation({
    onCompleted() {
      messageApi.success("Variant updated");
    },
    onError() {
      messageApi.error("Failed to update Variant");
    },
  });

  const variables: Partial<FindOneProductQueryVariables> = {
    id: productId,
  };

  const { data, loading } = useFindOneProductQuery({
    variables,
  });

  const product = data?.findOneProduct;
  const variant = product?.variants.find((v) => v.id === variantId);

  return (
    <PageLayout>
      {messageContext}
      <Title title={t("title")} />
      <Divider />
      {loading && (
        <div className="max-w-md mx-auto">
          <div className="flex gap-3 flex-wrap mb-6">
            <Skeleton.Node className="w-25.5 aspect-square" />
            <Skeleton.Node className="w-25.5 aspect-square" />
            <Skeleton.Node className="w-25.5 aspect-square" />
            <Skeleton.Node className="w-25.5 aspect-square" />
            <Skeleton.Node className="w-25.5 aspect-square" />
          </div>
          <VariantFormSkeleton />
        </div>
      )}
      {!loading && variant ? (
        <>
          <div className="max-w-md mx-auto">
            <Form.Item label={t("images.label")} layout="vertical">
              <UploadVariantImage productId={productId!} variant={variant} />
            </Form.Item>
          </div>
          <VariantForm
            initialValues={{
              ...variant,
              characterstics: createFormCharacteristics(
                variant?.characterstics ?? {},
              ),
            }}
            onFinish={onSubmit}
            loading={updateLoading}
            submitText={t("submit-button.text")}
          />
        </>
      ) : null}
      {!loading && !variant ? <Empty description="Variant not found" /> : null}
    </PageLayout>
  );
  function onSubmit(values: VariantFormData) {
    if (!variantId || !productId) {
      return;
    }
    updateVariant({
      variables: {
        id: productId,
        variantId,
        data: {
          ...values,
          characterstics: parseCharacteristics(values.characterstics ?? []),
        },
      },
    });
  }
}

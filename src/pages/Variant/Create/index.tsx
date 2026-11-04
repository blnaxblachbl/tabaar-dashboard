import { useNavigate, useParams } from "react-router";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { VariantForm } from "@/components/VariantForm";
import type { VariantFormData } from "@/components/VariantForm/types";
import { useAppendVariantMutation } from "@/graphql/generated";
import { parseCharacteristics } from "@/utils/product/parseFormData";
import { message } from "antd";
import { updateOneProduct, updateProduct } from "@/utils/product/updateQuery";

export default function CreateVariantPage() {
  const { productId } = useParams();
  const [messageApi, messageContext] = message.useMessage();
  const navigate = useNavigate();

  const [appendVariant, { loading }] = useAppendVariantMutation({
    onCompleted({ appendVariant: data }) {
      const vairant = data.variants[data.variants.length - 1];
      messageApi.success("Variant Created", 1.3, () => {
        navigate(`/products/${productId}/variants/${vairant.id}`, {
          replace: true,
        });
      });
    },
    onError() {
      message.error("Failed to create Variant");
    },
    update: (client, { data }) => {
      if (!data?.appendVariant) {
        return;
      }
      updateProduct({
        client,
        updatedProduct: data.appendVariant,
      });
      updateOneProduct({
        client,
        variables: { id: productId },
        updatedProduct: data.appendVariant,
      });
    },
  });

  return (
    <PageLayout>
      {messageContext}
      <Title title="Create Variant" />
      <VariantForm onFinish={onSubmit} loading={loading} submitText="Create" />
    </PageLayout>
  );
  function onSubmit(values: VariantFormData) {
    if (!productId) {
      return;
    }
    appendVariant({
      variables: {
        id: productId,
        data: {
          ...values,
          characterstics: parseCharacteristics(values.characterstics ?? []),
        },
      },
    });
  }
}

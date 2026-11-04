import { useNavigate, useParams } from "react-router";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { VariantForm } from "@/components/VariantForm";
import type { VariantFormData } from "@/components/VariantForm/types";
import { useAppendVariantMutation } from "@/graphql/generated";
import { parseCharacteristics } from "@/utils/product/parseFormData";
import { Divider, message } from "antd";
import { updateOneProduct, updateProduct } from "@/utils/product/updateQuery";
import { useTranslation } from "react-i18next";

export default function CreateVariantPage() {
  const { productId } = useParams();
  const [messageApi, messageContext] = message.useMessage();
  const navigate = useNavigate();
  const { t } = useTranslation("", {
    keyPrefix: "pages.create-variant",
  });

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
      <Title title={t("title")} />
      <Divider />
      <VariantForm
        onFinish={onSubmit}
        loading={loading}
        submitText={t("submit-button.text")}
      />
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

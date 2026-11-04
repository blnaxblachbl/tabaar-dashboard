import { useMemo, useState } from "react";
import { Upload, type UploadFile } from "antd";
import type { UploadRequestOption, RcFile } from "@rc-component/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useApolloClient } from "@apollo/client/react";
import { useTranslation } from "react-i18next";

import {
  FindOneProductDocument,
  type FindOneProductQuery,
} from "@/graphql/generated";
import { updateOneProduct, updateProduct } from "@/utils/product/updateQuery";
import { useUploadImages } from "@/hooks/useUploadImages";
import { useDeleteImages } from "@/hooks/useDeleteImages";
import type { UploadVariantImageProps } from "./types";

export function UploadVariantImage({
  variant,
  productId,
}: UploadVariantImageProps) {
  const { t } = useTranslation("", {
    keyPrefix: "components.upload-vairant-images",
  });
  const client = useApolloClient();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadImages, loading } = useUploadImages({
    onCompleted: (images) => {
      updateProductQueries(images);
    },
  });
  const { deleteImages } = useDeleteImages({
    onCompleted: (images) => {
      updateProductQueries(images);
    },
  });

  const uploadedFileList = useMemo<UploadFile[]>(() => {
    if (!productId || !variant) {
      return [];
    }
    return variant.images.map((image) => ({
      name: image,
      url: `/api/image/${productId}/${variant.id}/${image}`,
      status: "done",
      uid: image,
    }));
  }, [productId, variant]);

  return (
    <Upload
      fileList={[...uploadedFileList, ...fileList]}
      listType="picture-card"
      customRequest={cutomRequest}
      onRemove={onRemove}
      showUploadList={{
        showPreviewIcon: (file) => file.status !== "removed",
        removeIcon: (file) =>
          file.status === "removed" ? <LoadingOutlined /> : undefined,
      }}
      accept={"image/*"}
      locale={{
        uploading: t("uploading"),
        uploadError: t("uploadError"),
      }}
    >
      {!loading && (
        <button style={{ border: 0, background: "none" }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>{t("upload-button.text")}</div>
        </button>
      )}
    </Upload>
  );
  async function cutomRequest({
    onError,
    onSuccess,
    file: originFile,
  }: UploadRequestOption) {
    if (!variant || !productId) {
      onError?.(new Error(t("uploadError")));
      return;
    }
    const file = originFile as RcFile;
    setFileList((prev) => [
      ...prev,
      {
        ...file,
        status: "uploading",
      },
    ]);
    const { data, error } = await uploadImages({
      variantId: variant.id,
      productId,
      files: [file],
    });
    if (data) {
      onSuccess?.("Ok");
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    }
    if (error) {
      setFileList((prev) =>
        prev.map((item) => {
          if (item.uid === file.uid) {
            return {
              ...file,
              status: "error",
              error: new Error(t("uploadError")),
            };
          }
          return item;
        }),
      );
      onError?.(new Error(t("uploadError")));
    }
  }
  function updateProductQueries(images: string[]) {
    const variables = {
      id: productId,
    };
    const prev = client.readQuery<FindOneProductQuery>({
      query: FindOneProductDocument,
      variables,
    });
    const product = prev?.findOneProduct;
    if (product) {
      const updatedProduct = {
        ...product,
        variants: product.variants.map((v) => {
          if (v.id === variant.id) {
            return {
              ...v,
              images,
            };
          }
          return v;
        }),
      };
      updateOneProduct({
        client: client.cache,
        variables,
        updatedProduct,
      });
      updateProduct({
        client: client.cache,
        updatedProduct,
      });
    }
  }
  async function onRemove(file: UploadFile) {
    if (!file.url) {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
      return;
    }
    try {
      deleteImages({
        productId,
        variantId: variant.id,
        images: [file.uid],
      });
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e);
      }
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    }
  }
}

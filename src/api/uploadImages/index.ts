import { SAVED_ACCESS_TOKEN_KEY } from "@/utils/constants";
import type { ApiErrorData } from "@/api/types";
import { refreshToken } from "@/api";

import type { UploadImagesData, UploadImagesResponseData } from "./types";

export async function uploadImages({
  productId,
  variantId,
  files,
}: UploadImagesData): Promise<UploadImagesResponseData> {
  if (files.length > 5) {
    throw new Error("Max files count is 5");
  }
  const formData = new FormData();
  for (const file of files) {
    formData.append("images", file);
  }
  formData.set("productId", productId);
  formData.set("variantId", variantId);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${localStorage.getItem(SAVED_ACCESS_TOKEN_KEY)}`,
      },
    });
    if (!res.ok) {
      const error: ApiErrorData = await res.json();
      if (error.message === "Token expired") {
        await refreshToken();
        return uploadImages({ productId, variantId, files });
      }
      throw new Error(error.message ?? "Internal server error");
    }
    const data: UploadImagesResponseData = await res.json();
    return data;
  } catch (e) {
    if (import.meta.env.DEV) {
      console.error(e);
    }
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("Internal server error");
  }
}

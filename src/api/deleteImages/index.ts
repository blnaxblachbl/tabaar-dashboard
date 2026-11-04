import { SAVED_ACCESS_TOKEN_KEY } from "@/utils/constants";
import type { ApiErrorData } from "@/api/types";
import { refreshToken } from "@/api";

import type { DeleteImagesData, DeleteImagesResponseData } from "./types";

export async function deleteImages({
  productId,
  variantId,
  images,
}: DeleteImagesData) {
  try {
    const res = await fetch("/api/upload", {
      method: "DELETE",
      body: JSON.stringify({
        productId,
        variantId,
        images,
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem(SAVED_ACCESS_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error: ApiErrorData = await res.json();
      if (error.message === "Token expired") {
        await refreshToken();
        return deleteImages({ productId, variantId, images });
      }
      throw new Error(error.message ?? "Internal server error");
    }
    const data: DeleteImagesResponseData = await res.json();
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

import { SAVED_ACCESS_TOKEN_KEY } from "@/utils/constants";
import type { ApiErrorData } from "@/api/types";
import { refreshToken } from "@/api";

export async function bulkCreate(file: File) {
  const formData = new FormData();
  formData.set("file", file);
  try {
    const res = await fetch("/api/product/bulk", {
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
        return bulkCreate(file);
      }
      throw new Error(error.message ?? "Internal server error");
    }
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

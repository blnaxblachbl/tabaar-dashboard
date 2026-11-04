import { useState } from "react";

import { deleteImages as deleteFn } from "@/api";
import type { DeleteImagesData } from "@/api//deleteImages/types";
import type { UseDeleteImagesOptions } from "./types";

export function useDeleteImages(options?: UseDeleteImagesOptions) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  return {
    data,
    loading,
    error,
    deleteImages,
  };

  async function deleteImages(data: DeleteImagesData) {
    setLoading(true);
    const res: {
      data: null | string[];
      error: null | string;
    } = {
      data: null,
      error: null,
    };
    try {
      const result = await deleteFn(data);
      setData(result.images);
      options?.onCompleted?.(result.images);
      res.data = result.images;
    } catch (e) {
      if (e instanceof Error) {
        res.error = e.message;
      } else {
        res.error = "Failed";
      }
      setError(res.error);
      options?.onError?.(res.error);
    } finally {
      setLoading(false);
    }
    return res;
  }
}

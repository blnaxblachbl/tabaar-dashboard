import { useState } from "react";

import { uploadImages as upload } from "@/api";
import type { UploadImagesData } from "@/api/uploadImages/types";
import type { UseUploadImagesOptions } from "./types";

export function useUploadImages(options?: UseUploadImagesOptions) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  return {
    data,
    loading,
    error,
    uploadImages,
  };

  async function uploadImages(data: UploadImagesData) {
    setLoading(true);
    const res: {
      data: null | string[];
      error: null | string;
    } = {
      data: null,
      error: null,
    };
    try {
      const result = await upload(data);
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

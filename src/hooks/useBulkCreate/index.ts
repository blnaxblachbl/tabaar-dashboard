import { useState } from "react";

import { bulkCreate as upload } from "@/api";
import type { UseBulkCreateOptions } from "./types";

export function useBulkCreate(options?: UseBulkCreateOptions) {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    bulkCreate,
  };

  async function bulkCreate(file: File) {
    setLoading(true);
    try {
      await upload(file);
      options?.onCompleted?.();
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e);
      }
      let error = "Failed";
      if (e instanceof Error) {
        error = e.message;
      }
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }
}

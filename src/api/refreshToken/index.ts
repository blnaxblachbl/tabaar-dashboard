import {
  SAVED_ACCESS_TOKEN_KEY,
  SAVED_REFRESH_TOKEN_KEY,
} from "@/utils/constants";
import type { LoginUserMutation } from "@/graphql/generated";

export async function refreshToken(): Promise<LoginUserMutation> {
  try {
    const res = await fetch(`/api/user/refresh-token`, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: localStorage.getItem(SAVED_REFRESH_TOKEN_KEY),
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem(SAVED_ACCESS_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const error = await res.json();
      if (import.meta.env.DEV) {
        console.error("Refrsh token error", error);
      }
      if (res.status > 400 && res.status < 500) {
        localStorage.removeItem(SAVED_ACCESS_TOKEN_KEY);
        localStorage.removeItem(SAVED_REFRESH_TOKEN_KEY);
      }
      throw new Error(error.message ?? "Response not ok");
    }
    const data = await res.json();
    localStorage.setItem(SAVED_ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(SAVED_REFRESH_TOKEN_KEY, data.refreshToken);
    return data;
  } catch (e) {
    if (import.meta.env.DEV) {
      console.log("Refresh token error: ", e);
    }
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("Internal server error");
  }
}

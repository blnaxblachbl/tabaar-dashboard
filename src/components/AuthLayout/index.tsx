import { Navigate, Outlet } from "react-router";

import { useUser } from "@/hooks/useUser";

export function AuthLayout() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

import { Navigate, Outlet } from "react-router";
import { LoadingOutlined } from "@ant-design/icons";

import { useUser } from "@/hooks/useUser";

export function AuthLayout() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-dvh text-3xl">
        <LoadingOutlined />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

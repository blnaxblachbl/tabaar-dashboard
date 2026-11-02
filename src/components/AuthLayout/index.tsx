import { useFindMeQuery } from "@/graphql/generated";
import { Navigate, Outlet } from "react-router";

export function AuthLayout() {
  const { data, loading } = useFindMeQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.findMe) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import { AuthLayout } from "@/components/AuthLayout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" index element={<HomePage />} />
        </Route>
        <Route path="/login" index element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

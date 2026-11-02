import { BrowserRouter, Route, Routes } from "react-router";

import { AuthLayout } from "@/components/AuthLayout";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import ProductsPage from "@/pages/Products";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/products" index element={<ProductsPage />} />
        </Route>
        <Route path="/login" index element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

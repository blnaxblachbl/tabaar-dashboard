import { BrowserRouter, Route, Routes } from "react-router";

import { AuthLayout } from "@/components/AuthLayout";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import ProductsPage from "@/pages/Products";
import CreateProductPage from "@/pages/Products/Create";
import EditProductPage from "@/pages/Products/Edit";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/:productId" element={<EditProductPage />} />
        </Route>
        <Route path="/login" index element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

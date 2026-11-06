import { BrowserRouter, Route, Routes } from "react-router";

import { AuthLayout } from "@/components/AuthLayout";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import ProductsPage from "@/pages/Products";
import CreateProductPage from "@/pages/Products/Create";
import EditProductPage from "@/pages/Products/Edit";
import VariantPage from "@/pages/Variant";
import CreateVariantPage from "@/pages/Variant/Create";
import UsersPage from "@/pages/Users";
import CreateUserPage from "@/pages/Users/Create";
import { EditUserPage } from "@/pages/Users/Edit";
import ApiKeysPage from "@/pages/ApiKeys";
import CreateApiKeyPage from "@/pages/ApiKeys/Create";
import EditApiKeyPage from "@/pages/ApiKeys/Edit";
import RestApiDocsPage from "@/pages/RestApiDocs";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/docs/rest" index element={<RestApiDocsPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/:productId" element={<EditProductPage />} />
          <Route
            path="/products/:productId/variants/create"
            element={<CreateVariantPage />}
          />
          <Route
            path="/products/:productId/variants/:variantId"
            element={<VariantPage />}
          />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users/:userId" element={<EditUserPage />} />
          <Route path="/keys" element={<ApiKeysPage />} />
          <Route path="/keys/create" element={<CreateApiKeyPage />} />
          <Route path="/keys/:apiKeyId" element={<EditApiKeyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

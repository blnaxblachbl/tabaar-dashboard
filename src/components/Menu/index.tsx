import { useState } from "react";
import { Menu as AntMenu, Modal } from "antd";
import { useLocation, useNavigate } from "react-router";
import {
  ProductOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  DeleteRowOutlined
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  SAVED_ACCESS_TOKEN_KEY,
  SAVED_REFRESH_TOKEN_KEY,
} from "@/utils/constants";
import { useApolloClient } from "@apollo/client/react";

export function Menu() {
  const { t } = useTranslation("", {
    keyPrefix: "components.menu",
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const client = useApolloClient();

  return (
    <>
      <AntMenu
        selectedKeys={[pathname]}
        items={[
          {
            key: "/",
            label: t("home"),
            icon: <HomeOutlined />,
            onClick: () => navigate("/"),
          },
          {
            key: "/products",
            label: t("products"),
            icon: <ProductOutlined />,
            onClick: () => navigate("/products"),
          },
          {
            key: "/products/deleted",
            label: t("archive"),
            icon: <DeleteRowOutlined />,
            onClick: () => navigate("/products/deleted"),
          },
          {
            key: "/users",
            label: t("users"),
            icon: <UserOutlined />,
            onClick: () => navigate("/users"),
          },
          {
            key: "/keys",
            label: t("api-keys"),
            icon: <UserOutlined />,
            onClick: () => navigate("/keys"),
          },
          {
            key: "/logout",
            label: t("logout.label"),
            icon: <LogoutOutlined />,
            onClick: () => setOpen(true),
            danger: true,
          },
        ]}
      />
      <Modal
        open={open}
        title={t("logout.modal.title")}
        okText={t("logout.modal.okText")}
        cancelText={t("logout.modal.cancelText")}
        onOk={logout}
        okButtonProps={{
          danger: true,
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
  function logout() {
    localStorage.removeItem(SAVED_ACCESS_TOKEN_KEY);
    localStorage.removeItem(SAVED_REFRESH_TOKEN_KEY);
    client.clearStore();
    client.resetStore();
    navigate("/login");
  }
}

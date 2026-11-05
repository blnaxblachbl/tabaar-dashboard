import { Menu as AntMenu } from "antd";
import { useLocation, useNavigate } from "react-router";
import { ProductOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export function Menu() {
  const { t } = useTranslation("", {
    keyPrefix: "components.menu",
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
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
          key: "/users",
          label: t("users"),
          icon: <UserOutlined />,
          onClick: () => navigate("/users"),
        },
      ]}
    />
  );
}

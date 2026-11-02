import { Menu as AntMenu } from "antd";
import { useLocation, useNavigate } from "react-router";
import { ProductOutlined, HomeOutlined } from "@ant-design/icons";

export function Menu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AntMenu
      selectedKeys={[pathname]}
      items={[
        {
          key: "/",
          label: "Home",
          icon: <HomeOutlined />,
          onClick: () => navigate("/"),
        },
        {
          key: "/products",
          label: "Productts",
          icon: <ProductOutlined />,
          onClick: () => navigate("/products"),
        },
      ]}
    />
  );
}

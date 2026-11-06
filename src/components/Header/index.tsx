import { Popover, Space, theme, Typography, Avatar, Button } from "antd";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { useUser } from "@/hooks/useUser";
import { Menu } from "@/components/Menu";

export function Header() {
  const { t } = useTranslation("", {
    keyPrefix: "components.header",
  });
  const { token } = theme.useToken();
  const { user } = useUser({
    fetchPolicy: "cache-only",
  });

  return (
    <header
      className="h-(--header-height) fixed top-0 w-full z-90"
      style={{
        backgroundColor: token.colorBgElevated,
      }}
    >
      <div className="flex items-center justify-between max-w-6xl w-full px-3 py-6 mx-auto h-full">
        <Link to={"/"}>
          <Typography.Text className="text-xl! font-bold">
            Tabaar
          </Typography.Text>
        </Link>
        {user ? (
          <Popover
            content={<Menu />}
            classNames={{
              container: "p-0! rounded-md! overflow-hidden",
            }}
            arrow={false}
            placement="bottomRight"
          >
            <Space>
              <Avatar>{user.name.charAt(0)}</Avatar>
              <Typography.Text>{user.name}</Typography.Text>
            </Space>
          </Popover>
        ) : (
          <Link to="/login">
            <Button>{t("login-button.text")}</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

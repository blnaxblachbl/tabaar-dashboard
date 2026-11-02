import { theme, Typography } from "antd";
import { Link } from "react-router";

export function Header() {
  const { token } = theme.useToken();

  return (
    <header
      className="h-(--header-height)"
      style={{
        backgroundColor: token.colorBgContainerDisabled,
      }}
    >
      <div className="flex items-center justify-between max-w-6xl w-full px-3 py-6 mx-auto h-full">
        <Link to={"/"}>
          <Typography.Text className="text-xl! font-bold">
            Tabaar
          </Typography.Text>
        </Link>
      </div>
    </header>
  );
}

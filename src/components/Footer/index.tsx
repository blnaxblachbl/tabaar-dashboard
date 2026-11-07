import { Button, theme, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { GithubOutlined, InfoCircleOutlined } from "@ant-design/icons";

export function Footer() {
  const { t } = useTranslation("", {
    keyPrefix: "components.footer",
  });
  const { token } = theme.useToken();

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: token.colorBgElevated,
      }}
    >
      <div className="max-w-6xl w-full px-3 py-6 mx-auto h-full space-y-3">
        <div className="flex justify-between gap-3">
          <div className="space-y-1">
            <div>
              <Button
                type="text"
                href="/about"
                className="hover:bg-transparent! p-0!"
                icon={<InfoCircleOutlined />}
              >
                {t("about")}
              </Button>
            </div>
            <div>
              <Button
                type="text"
                href="https://github.com/blnaxblachbl/tabaar"
                className="hover:bg-transparent! p-0!"
                icon={<GithubOutlined />}
                target="_blank"
              >
                {t("source")}
              </Button>
            </div>
          </div>
          <Button
            type="text"
            href="https://tit.dev"
            className="hover:bg-transparent! p-0!"
            target="_blank"
          >
            {t("author")}
          </Button>
        </div>
        <div className="text-center">
          <Typography.Text>©Tabaar {new Date().getFullYear()}</Typography.Text>
        </div>
      </div>
    </footer>
  );
}

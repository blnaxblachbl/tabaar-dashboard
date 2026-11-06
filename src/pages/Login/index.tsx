import { Button, Form, Input, message, theme, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useApolloClient } from "@apollo/client/react";

import { FindMeDocument, useLoginUserMutation } from "@/graphql/generated";
import {
  SAVED_ACCESS_TOKEN_KEY,
  SAVED_REFRESH_TOKEN_KEY,
} from "@/utils/constants";
import type { LoginFormData } from "./types";

export default function LoginPage() {
  const [messageApi, messageContext] = message.useMessage();
  const { token } = theme.useToken();
  const { t } = useTranslation("", {
    keyPrefix: "pages.login",
  });
  const navigate = useNavigate();
  const client = useApolloClient();

  const [login, { loading }] = useLoginUserMutation({
    onCompleted({ loginUser }) {
      localStorage.setItem(SAVED_ACCESS_TOKEN_KEY, loginUser.accessToken);
      localStorage.setItem(SAVED_REFRESH_TOKEN_KEY, loginUser.refreshToken);
      messageApi.success("Logged in successfully");
      client.writeQuery({
        query: FindMeDocument,
        data: { findMe: loginUser.user },
      });
      navigate("/", { replace: true });
    },
    onError(error) {
      if (error.message === "Invalid credentials") {
        return messageApi.error("Invalid credentials");
      }
      messageApi.error("Failed to login");
    },
  });

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      {messageContext}
      <Form<LoginFormData>
        classNames={{ root: "max-w-md w-full p-6! rounded-md!" }}
        style={{
          backgroundColor: token.colorBgContainer,
          borderWidth: 1,
          borderColor: token.colorBorderSecondary,
        }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Typography.Title className="text-2xl! mb-6!">
          {t("title")}
        </Typography.Title>
        <Form.Item
          label={t("email.label")}
          name="email"
          rules={[
            {
              required: true,
              message: t("email.errors.required"),
            },
            {
              type: "email",
              message: t("email.errors.invalid"),
            },
          ]}
        >
          <Input placeholder="john-doe@tabaar.com" />
        </Form.Item>
        <Form.Item
          label={t("password.label")}
          name="password"
          rules={[
            {
              required: true,
              message: t("password.errors.required"),
            },
          ]}
          className="mb-9!"
        >
          <Input.Password placeholder="*************" />
        </Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" block>
          {t("submit-button.text")}
        </Button>
      </Form>
    </div>
  );
  function onSubmit(values: LoginFormData) {
    login({ variables: { data: values } });
  }
}

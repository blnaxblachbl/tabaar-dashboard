import { Divider } from "antd";
import { useTranslation } from "react-i18next";

import ArchitectureSvg from "@/assets/architecture.svg?react";
import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";

export default function AboutPage() {
  const { t } = useTranslation("", {
    keyPrefix: "pages.about",
  });

  return (
    <PageLayout className="space-y-21">
      <section>
        <Title title={t("use-cases.title")} />
        <Divider />
        <table className="ring ring-gray-600 rounded-md overflow-hidden text-sm">
          <thead>
            <tr>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.use-case")}
              </th>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.description")}
              </th>
            </tr>
          </thead>
          <tbody className="text-left font-normal!">
            <tr>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.omnichannel")}
              </th>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.omnichannel-description")}
              </th>
            </tr>
            <tr>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.microservices")}
              </th>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.microservices-description")}
              </th>
            </tr>
            <tr>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.search")}
              </th>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.search-description")}
              </th>
            </tr>
            <tr>
              <th className="ring ring-gray-600 p-3">{t("use-cases.dam")}</th>
              <th className="ring ring-gray-600 p-3">
                {t("use-cases.dam-description")}
              </th>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <Title title={t("arch.title")} />
        <Divider />
        <ArchitectureSvg />
      </section>
      <section>
        <Title title={t("tech.title")} />
        <Divider />
        <ul className="pl-3 space-y-3">
          <li>
            <span className="font-bold">{t("tech.point1.title")}</span>:{" "}
            {t("tech.point1.text")}
          </li>
          <li>
            <span className="font-bold">{t("tech.point2.title")}</span>:{" "}
            {t("tech.point2.text")}
          </li>
          <li>
            <span className="font-bold">{t("tech.point3.title")}</span>:{" "}
            {t("tech.point3.text")}
          </li>
          <li>
            <span className="font-bold">{t("tech.point4.title")}</span>:{" "}
            {t("tech.point4.text")}
          </li>
          <li>
            <span className="font-bold">{t("tech.point5.title")}</span>:{" "}
            {t("tech.point5.text")}
          </li>
        </ul>
      </section>
    </PageLayout>
  );
}

import { Button, Menu, Popover } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { Language } from "@/libs/i18n/types";
import { SAVED_LANGUAGE_KEY } from "@/utils/constants";
import LocaleSvg from "@/assets/locale.svg?react";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <Popover
      classNames={{
        container: "p-0! rounded-md! overflow-hidden",
      }}
      arrow={false}
      placement="bottomRight"
      content={
        <Menu
          selectedKeys={[i18n.language]}
          items={[
            {
              label: "English",
              key: Language.ENGLISH,
              onClick: handleLanguageChange.bind(null, Language.ENGLISH),
            },
            {
              label: "Русский",
              key: Language.RUSSIAN,
              onClick: handleLanguageChange.bind(null, Language.RUSSIAN),
            },
            {
              label: "عربي",
              key: Language.ARABIC,
              onClick: handleLanguageChange.bind(null, Language.ARABIC),
              className: "text-right",
            },
            {
              label: "Española",
              key: Language.SPANISH,
              onClick: handleLanguageChange.bind(null, Language.SPANISH),
            },
            {
              label: "Italiana",
              key: Language.ITALIAN,
              onClick: handleLanguageChange.bind(null, Language.ITALIAN),
            },
            {
              label: "Türkçe",
              key: Language.TURKISH,
              onClick: handleLanguageChange.bind(null, Language.TURKISH),
            },
            {
              label: "中国人",
              key: Language.CHINESE,
              onClick: handleLanguageChange.bind(null, Language.CHINESE),
            },
            {
              label: "हिंदी",
              key: Language.HINDI,
              onClick: handleLanguageChange.bind(null, Language.HINDI),
            },
            {
              label: "Polski",
              key: Language.POLISH,
              onClick: handleLanguageChange.bind(null, Language.POLISH),
            },
            {
              label: "한국인",
              key: Language.KOREAN,
              onClick: handleLanguageChange.bind(null, Language.KOREAN),
            },
            {
              label: "Français",
              key: Language.FRENCH,
              onClick: handleLanguageChange.bind(null, Language.FRENCH),
            },
          ]}
        />
      }
    >
      <Button
        type="text"
        icon={<LocaleSvg className="w-4 h-4" />}
        aria-label="locale"
        className="uppercase"
      />
    </Popover>
  );
  function handleLanguageChange(lang: Language) {
    dayjs.locale(lang === "zh" ? "zh-cn" : lang);
    i18n.changeLanguage(lang);
    localStorage.setItem(SAVED_LANGUAGE_KEY, lang);
    if (lang === Language.ARABIC) {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }
}

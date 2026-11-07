import { Button, Menu, Popover } from "antd";
import { useTranslation } from "react-i18next";

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
              onClick: () => handleLanguageChange(Language.ENGLISH),
            },
            {
              label: "Русский",
              key: Language.RUSSIAN,
              onClick: () => handleLanguageChange(Language.RUSSIAN),
            },
          ]}
        />
      }
    >
      <Button
        type="text"
        icon={<LocaleSvg className="w-4 h-4" />}
        aria-label="locale"
      />
    </Popover>
  );
  function handleLanguageChange(lang: Language) {
    i18n.changeLanguage(lang);
    localStorage.setItem(SAVED_LANGUAGE_KEY, lang);
  }
}

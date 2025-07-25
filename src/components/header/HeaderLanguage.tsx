import Dropdown from "react-bootstrap/Dropdown";
import styles from "./assets/HeaderLanguage.module.scss";

import { appLanguageSelector, switchLanguage } from "../../reducers/appReducer";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { AppLanguage } from "../../i18n/I18nContext";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const languages = [
  {
    link: require("./images/uzbekistan.png"),
    title: "Uzbek",
    key: AppLanguage.Uzbek,
  },
  {
    link: require("./images/russian.png"),
    title: "Russian",
    key: AppLanguage.Russian,
  },
  {
    link: require("./images/english.png"),
    title: "English",
    key: AppLanguage.English,
  },
];

export default function HeaderLanguage() {
  const appLanguage = useShallowEqualSelector(appLanguageSelector);

  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(switchLanguage({ language: AppLanguage.English }));
        }}
      >
        AAA
      </button>
    </div>
  );
}

import { useEffect } from "react";
import { getValueFromLang } from "../translation/translation";
import {
  LanguageVariantsProps,
  useTranslationStore,
} from "../store/translation/useTranslationStore";

const useTranslationHook = () => {
  const { selectedLanguage, shouldCheck, setSelectedLanguage } =
    useTranslationStore();

  useEffect(() => {
    if (selectedLanguage && !shouldCheck) return;
    if (typeof localStorage !== "undefined") {
      const res = localStorage.getItem("lang") || "en";
      setSelectedLanguage(res as LanguageVariantsProps);
    }
  }, [selectedLanguage, setSelectedLanguage, shouldCheck]);

  const translate = (...keyPath: string[]) => {
    return getValueFromLang(selectedLanguage || "en", ...keyPath);
  };

  return { translate };
};

export default useTranslationHook;

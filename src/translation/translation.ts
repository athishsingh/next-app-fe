import english from "../locales/english/en.json";
import malay from "../locales/malaysian/malay.json";
import { LanguageVariantsProps } from "../store/translation/useTranslationStore";

const translations = {
  en: english,
  my: malay,
};

const getKeyFromObject = <T extends Record<string, any>>(
  obj: T | undefined | null,
  ...keyPath: string[]
): any => {
  return keyPath.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  );
};

export const getValueFromLang = (
  lang: LanguageVariantsProps,
  ...keyPath: string[]
): string => {
  const translation = getKeyFromObject(translations[lang], ...keyPath);
  const fallBackLanguage = "en";

  if (translation === undefined) {
    return (
      getKeyFromObject(translations[fallBackLanguage], ...keyPath) ??
      keyPath[keyPath.length - 1]
    );
  }

  return translation;
};

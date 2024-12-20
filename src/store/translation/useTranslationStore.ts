import { create } from "zustand";

export type LanguageVariantsProps = "my" | "en";
interface TranslationStoreTypes {
  selectedLanguage: LanguageVariantsProps | null;
  shouldCheck: boolean;
  setSelectedLanguage: (val: LanguageVariantsProps) => void;
}

export const useTranslationStore = create<TranslationStoreTypes>((set) => ({
  selectedLanguage: null,
  shouldCheck: false,
  setSelectedLanguage: (val) => {
    set({ shouldCheck: true, selectedLanguage: val });
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("lang", val);
    }
    setTimeout(() => {
      set({ shouldCheck: false });
    }, 500);
  },
}));

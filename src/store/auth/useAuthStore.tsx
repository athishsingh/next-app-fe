import { create } from "zustand";

interface AuthStoreTypes {
  showPrivacyModal: boolean;
  showSupportModal: boolean;
  setShowPrivacyModal: (showPrivacyModal: boolean) => void;
  setShowSupportModal: (showSupportModal: boolean) => void;
}
export const useAuthStore = create<AuthStoreTypes>((set) => ({
  showPrivacyModal: false,
  showSupportModal: false,
  setShowPrivacyModal: (showPrivacyModal) => set({ showPrivacyModal }),
  setShowSupportModal: (showSupportModal) => set({ showSupportModal }),
}));

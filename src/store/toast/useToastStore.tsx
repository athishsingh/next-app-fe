import { ToastType } from "@/src/components/toast/toast.enum";
import { create } from "zustand";

interface Toast {
  id: string;
  message: string;
  duration: number;
  toastType: ToastType;
  description: string;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (
    message: string,
    duration: number,
    description: string,
    toastType?: ToastType
  ) => void;
  removeToast: (id: string) => void;
}
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (
    message,
    duration = 3000,
    description,
    toastType = ToastType.success
  ) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, message, duration, description, toastType },
      ],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

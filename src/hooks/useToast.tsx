import { ToastType } from "../components/toast/toast.enum";
import { useToastStore } from "../store/toast/useToastStore";

const useToast = () => {
  const { addToast } = useToastStore();

  const showWarningToast = ({
    message,
    description,
    duration = 3000,
  }: {
    message: string;
    description: string;
    duration?: number;
  }) => {
    addToast(message, duration, description, ToastType.warning);
  };
  const showSuccessToast = ({
    message,
    description,
    duration = 3000,
  }: {
    message: string;
    duration?: number;
    description: string;
  }) => {
    addToast(message, duration, description, ToastType.success);
  };
  const showErrorToast = ({
    message,
    description,
    duration = 3000,
  }: {
    message: string;
    duration?: number;
    description: string;
  }) => {
    addToast(message, duration, description, ToastType.error);
  };
  const showDefaultToast = ({
    message,
    description,
    duration = 3000,
  }: {
    message: string;
    duration?: number;
    description: string;
  }) => {
    addToast(message, duration, description, ToastType.default);
  };

  return {
    showErrorToast,
    showSuccessToast,
    showWarningToast,
    showDefaultToast,
  };
};
export default useToast;

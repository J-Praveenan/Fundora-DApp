import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};
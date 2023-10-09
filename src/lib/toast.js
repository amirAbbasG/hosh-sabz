import { toast } from "react-toastify";

export const successMessage = (message) => {
  toast.success(message, {
    position: "top-left",
  });
};

export const errorMessage = (message) => {
  toast.error(message, {
    position: "top-left",
  });
};

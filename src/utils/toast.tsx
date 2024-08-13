import { toast } from "react-toastify";
import { ToastPoints } from "../components/shared/toasts/ToastPoints/toastPoints";

export const PointsToast = (amount: number, label: string) =>
  toast(
    ({ closeToast, toastProps }) => (
      <ToastPoints
        amount={amount}
        description={label}
        closeToast={closeToast}
        toastProps={toastProps}
      />
    ),
    { theme: "colored" },
  );

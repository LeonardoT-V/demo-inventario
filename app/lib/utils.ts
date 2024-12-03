import { ReturnedMessage } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderToaster({
  detail,
  message,
  type = "default",
}: ReturnedMessage) {
  if (type === "error") {
    toast.error(message, { description: detail });
    return;
  }
  if (type === "info") {
    toast.info(message, { description: detail });
    return;
  }
  if (type === "success") {
    toast.success(message, { description: detail });
    return;
  }
  if (type === "loading") {
    const toastId = toast.loading(message, { description: detail });
    return toastId;
  }
  toast(message, { description: detail });
}

export function removeLoadingToaster(id: number) {
  toast.dismiss(id);
}

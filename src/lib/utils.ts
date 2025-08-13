import { AxiosError } from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GenericError } from "./types";
import { toast } from "react-toastify";
import { INVALID_SESSION_MSG } from "../Constants";
import { queryClient } from "./api";
import { NavigateFunction } from "react-router-dom";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(time: number) {
  return await new Promise((res) => setTimeout(res, time));
}

export function mutationErrorHandler(
  error: AxiosError<GenericError>,
  navigate?: NavigateFunction,
  path?: string,
) {
  console.error("mutation error:", error);
  const errorObject =
    typeof error.response?.data !== "string" && error.response?.data;
  const errorMessage =
    errorObject && "error" in errorObject && errorObject.error;
  const validationError =
    errorObject && "errors" in errorObject && errorObject.errors;

  /** Check if the session invalidation message is returned from server, or atleast check if the status is 401 (I always send 401 for invalid session) */
  if (errorMessage === INVALID_SESSION_MSG || error.status === 401) {
    // set null
    queryClient.setQueryData(["auth"], null);
    queryClient.setQueryData(["partnerAuth"], null);
    queryClient.setQueryData(["adminAuth"], null);
    // invalidate all
    queryClient.invalidateQueries({ queryKey: ["auth"] });
    queryClient.invalidateQueries({ queryKey: ["partnerAuth"] });
    queryClient.invalidateQueries({ queryKey: ["adminAuth"] });
    // invalidate their sub data
    queryClient.invalidateQueries({ queryKey: ["partner"] });
    queryClient.invalidateQueries({ queryKey: ["admin"] });
    if (navigate) {
      navigate(path ?? "/");
    }
  }

  if (validationError) {
    validationError.forEach((err) => {
      toast.error(
        err.path[0].toUpperCase() + err.path.slice(1) + ": " + err.message,
      );
    });
    return;
  }
  toast.error(errorMessage || error.message || "Unknown error");
}

export function formatDate(date: string | Date | null) {
  return !date ? "No date" : dayjs(date).format("ddd, DD MMM YYYY");
}

export function initializeRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

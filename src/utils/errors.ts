import type { AxiosError } from "axios";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your input.",
  401: "Invalid username or password.",
  403: "You don't have permission to perform this action.",
  404: "The requested resource was not found.",
  409: "A user with this username or email already exists.",
  422: "Please check your input and try again.",
  429: "Too many requests. Please wait and try again.",
  500: "Something went wrong on our end. Please try again later.",
};

export function getErrorMessage(err: unknown): string {
  const axiosError = err as AxiosError<{ detail?: string; message?: string }>;

  if (axiosError.response?.data?.detail) {
    return axiosError.response.data.detail;
  }

  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  const status = axiosError.response?.status;
  if (status && STATUS_MESSAGES[status]) {
    return STATUS_MESSAGES[status];
  }

  if (axiosError.message === "Network Error") {
    return "Unable to connect to the server. Please check your connection.";
  }

  return "Something went wrong. Please try again.";
}

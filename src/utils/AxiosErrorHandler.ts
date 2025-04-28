import { AxiosError } from "axios";

export function AxiosErrorHandler(
  error: unknown
  //   setErrorMessage: (message: string) => void
) {
  let message;
  if (error instanceof AxiosError) {
    // 1. Handle server responded with error (4xx, 5xx)
    if (error.response) {
      // console.log("Server responded with error:", error.response.data);
      message = error.response.data.error || "Something went wrong on server.";
    }
    // 2. Handle no response (e.g., network error)
    else if (error.request) {
      // console.log("No response received:", error.request);
      message = error.request.data.error || "No response received.";
    }
    // 3. Something else happened (setup issue)
    else {
      // console.log("Axios error during setup:", error.message);
      message = "Request setup error: " + error.message;
    }
  } else {
    // Not an Axios error — something unknown
    message = "Unexpected error occurred.";
  }
  return message;
}

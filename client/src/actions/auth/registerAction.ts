import { axiosInstance } from "../../lib/axios/axiosInstance";
import { AxiosError } from "axios";
import { errorAlert } from "../../utils/errorAlert";

export interface registerActionProps {
  request: Request;
}

export const registerAction = async ({ request }: registerActionProps) => {
  try {
    const formData = await request.formData();
    const submittedFormData = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
    };
    const req = await axiosInstance({
      method: "post",
      url: "auth/register",
      data: submittedFormData,
    });

    const resp = req.data;

    if (resp.error && resp.showMessage) {
      errorAlert(resp.message);
      return null;
    } else if (resp.error || resp.showMessage == false) {
      errorAlert("Something went wrong");
      return null;
    } else {
      return (window.location.href = "/confirm-otp");
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      errorAlert(axiosError.response.data);
      return { error: axiosError.response.data };
    }
    if (axiosError.request) {
      errorAlert(axiosError.request);
      return { error: axiosError.request };
    } else {
      errorAlert("something went wrong");
      return { error: "something went wrong" };
    }
  }
};

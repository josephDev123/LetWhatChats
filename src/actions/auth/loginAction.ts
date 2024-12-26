import { axiosInstance } from "../../lib/axios/axiosInstance";
import { errorAlert } from "../../utils/errorAlert";
import { AxiosError } from "axios";

export interface loginActionProps {
  request: Request;
}
export const loginAction = async ({ request }: loginActionProps) => {
  try {
    const formData = await request.formData();

    const extractFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    console.log(extractFormData);
    const req = await axiosInstance({
      method: "post",
      url: "auth/login",
      data: extractFormData,
    });
    const res = req.data;
    console.log(res);
    if (res.error && res.showMessage) {
      errorAlert(res.message);
      return null;
    } else if (res.error && !res.showMessage) {
      errorAlert("Something went wrong");
      return null;
    } else {
      return (window.location.href = "/");
    }
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.request) {
      errorAlert(axiosError.request);
      return axiosError.request;
    }

    if (axiosError.response) {
      errorAlert(axiosError.response.data);
      return axiosError.response.data;
    }
    errorAlert("Something went wrong");
    return true;
  }
};

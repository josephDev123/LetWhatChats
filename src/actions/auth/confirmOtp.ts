import { redirect } from "react-router-dom";
import { axiosInstance } from "../../lib/axios/axiosInstance";
import { errorAlert } from "../../utils/errorAlert";
import Cookies from "js-cookie";

interface sendOtpProps {
  request: Request;
}

export const ConfirmOtp = async ({ request }: sendOtpProps) => {
  try {
    const data = await request.formData();

    const otp = data.get("data");
    const auth = Cookies.get("user");
    const authEmail = auth ? JSON.parse(auth).email : "";

    const payload = {
      otp: otp,
      email: authEmail,
    };
    const confirmOtp = await axiosInstance({
      method: "post",
      url: "auth/confirm-otp",
      data: payload,
    });

    const resp = confirmOtp.data;
    // console.log(resp);
    if (resp.error && resp.showMessage) {
      errorAlert(resp.message);
      return null;
    } else if (resp.error && !resp.showMessage) {
      errorAlert("Something went wrong");
      return null;
    } else {
      return redirect("/login");
    }
    return null;
  } catch (error) {
    console.log((error as Error).message);
    errorAlert("Something went wrong");
    return null;
  }
};

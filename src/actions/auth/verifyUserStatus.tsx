import { redirect } from "react-router-dom";
// import { getCredential } from "../../utils/getCredential";
import { useUser } from "../../customHooks/useUser";

export const verifyUserStatus = () => {
  try {
    // const { userData } = getCredential();
    // const { user } = userData;
    const user = useUser();

    if (!user.data) {
      return redirect("/login");
    }

    // else if (!user?.) {
    //   return redirect("/confirm-otp");
    // } else {
    //   return "hello";
    // }
  } catch (error) {
    throw Error("User not authorized");
  }

  return null;
};

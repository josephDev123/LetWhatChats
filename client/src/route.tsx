import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { registerAction } from "./actions/auth/registerAction";
import { loginAction } from "./actions/auth/loginAction";
import { ConfirmOtp } from "./actions/auth/confirmOtp";
import Otp from "./pages/otp/Otp";
import SetUsername from "./pages/setUsername/SetUsername";

import HomeLayout from "./pages/Home/HomeLayout";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import { verifyUserStatus } from "./actions/auth/verifyUserStatus";
import DashboardPage from "./pages/Dashboard/page";
import ChatById from "./pages/MessageId/ChatById";

export const mainroutes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,

    children: [
      {
        // path: "/",
        index: true,
        element: "welcome",
        errorElement: "error",
      },

      {
        path: ":room",
        element: <ChatById />,
        errorElement: "error",
      },
      {
        path: "community",
        element: "community",
        errorElement: "error",
      },

      {
        path: "chats",
        element: "chats  room",
        errorElement: "error",
      },
      {
        path: "calls",
        element: "Calls",
        errorElement: "error",
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: verifyUserStatus,
    children: [
      {
        index: true,
        // path: "/dashboard",
        element: <DashboardPage />,
        // loader: testMiddleware,
        errorElement: "error occur in dashboard",
      },
    ],
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: "error",
    action: registerAction,
  },
  {
    path: "/confirm-otp",
    element: <Otp />,
    errorElement: "error",
    action: ConfirmOtp,
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: "error",
  },

  {
    path: "/set-username",
    element: <SetUsername />,
    errorElement: "error",
  },
]);

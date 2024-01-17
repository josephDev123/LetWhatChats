import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import SVGChatComponent from "../../svgComponent/ChatIcon";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "../../axios/axiosInstance";
import LoadingModal from "../../components/generic/LoadingModal";
import { registerSchema } from "../../zodTypes/registerType";
import { useNavigate } from "react-router-dom";
import { LuUserCircle2 } from "react-icons/lu";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useNavigate();

  type registerType = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({ resolver: zodResolver(registerSchema) });

  const handleOnLogin: SubmitHandler<registerType> = async (data) => {
    setStatus("loading");
    try {
      const submitReq = await axiosInstance({
        method: "post",
        url: "/auth/login",
        data: {
          email: data.email,
          username: data.username,
          password: data.password,
        },
      });
      const resp = await submitReq.data;
      console.log(resp);

      location("/login");
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4 drop-shadow-md">
        <div className="flex justify-center items-center ">
          <SVGChatComponent color="green" className="w-[100px] h-[100px]" />
        </div>

        {/* error when submiting */}
        {status === "error" && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
        <form className="space-y-4 mt-6" onSubmit={handleSubmit(handleOnLogin)}>
          <div className="flex flex-col">
            <div className="flex gap-1 w-full items-center justify-center relative">
              <MdAlternateEmail color="green" className="absolute left-2" />
              <input
                {...register("email")}
                name="email"
                type="email"
                className="p-2 border-b outline-none w-full pl-8 focus:border-green-300 mt-1"
                placeholder="Enter your email"
              />
            </div>

            <p className="text-xs text-red-500">
              {errors.email ? errors.email.message : ""}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1 w-full items-center justify-center relative">
              <LuUserCircle2 color="green" className="absolute left-2" />
              <input
                {...register("username")}
                name="username"
                type="text"
                className="p-2 border-b outline-none w-full pl-8 focus:border-green-300 mt-1"
                placeholder="Enter your username"
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.username ? errors.username.message : ""}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-1 w-full items-center justify-center relative">
              <RiLockPasswordLine color="green" className="absolute left-2" />
              <input
                {...register("password")}
                name="password"
                type={`${!showPassword ? "password" : "text"}`}
                className="p-2 border-b outline-none w-full pl-8 focus:border-green-300 mt-1"
                placeholder="Enter your correct password"
              />

              <AiOutlineEye
                className="absolute right-1 top-5 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>

            <p className="text-xs text-red-500">
              {errors.password ? errors.password.message : ""}
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="py-2 rounded-full w-fit px-5 text-white/70 font-semibold bg-[#28C8C8]"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4">
          {" "}
          Not registered yet{" "}
          <Link to="/register" className="text-green-600 font-semibold ">
            Register
          </Link>
        </p>
      </div>

      {/* loading modal */}
      {status === "loading" && <LoadingModal />}
    </div>
  );
}

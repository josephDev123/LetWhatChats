import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import SVGChatComponent from "../../svgComponent/ChatIcon";
import { GoPerson } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserCircle2 } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "../../lib/axios/axiosInstance";
import { UploadFirebase } from "../../utils/firebaseImgUpload";
import LoadingModal from "../../generic/LoadingModal";
import { registerSchema } from "../../zodTypes/registerType";
import { useNavigate } from "react-router-dom";
import { Images } from "../../../Images";
import { AxiosErrorHandler } from "../../utils/AxiosErrorHandler";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [uploadProfileUrl, setUploadProfileUrl] = useState<null | string>();
  const [profileImgData, setprofileImgData] = useState<object>();
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useNavigate();

  type registerType = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({ resolver: zodResolver(registerSchema) });

  const handleUploadedProfileImgDisplay = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
      setprofileImgData(selectedFile);
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileUrl = event.target?.result;
        setUploadProfileUrl(fileUrl as string);
      };

      reader.readAsDataURL(selectedFile);
      // reader.abort();
    }
  };

  const handleOnSubmit: SubmitHandler<registerType> = async (data) => {
    setStatus("loading");
    try {
      if (!profileImgData) {
        setStatus("");
        toast.error("profile pic required");
        return;
      }
      const fileUploadUrl = (await UploadFirebase(profileImgData)) as any;
      console.log(fileUploadUrl);
      if (!fileUploadUrl) {
        setStatus("");
        toast.error("profile pic upload failed");
        return;
      } else {
        const submitReq = await axiosInstance({
          method: "post",
          url: "auth/register",
          data: {
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            profile_img: fileUploadUrl,
          },
        });
        const resp = await submitReq.data;
        console.log(resp);

        // window.location.href = "/login";
        location("/login");
      }
    } catch (error: unknown) {
      setStatus("error");
      const errorMessage = AxiosErrorHandler(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div
      // bg-[url(./imgs/pngs/whatsappBackground.jpeg)]
      style={{ backgroundImage: `url(${Images.whatsapp_bg})` }}
      className="flex flex-col h-screen w-full justify-center items-center  bg-auto"
    >
      <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4 drop-shadow-md">
        <div className="flex justify-center items-center ">
          <SVGChatComponent color="green" className="w-[100px] h-[100px]" />
        </div>

        {/* error when submiting */}
        {status === "error" && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="flex flex-col">
            <div className="flex gap-1 w-full items-center justify-center relative">
              <GoPerson color="green" className="absolute left-2" />
              <input
                {...register("name")}
                name="name"
                type="text"
                className="p-2 border-b outline-none w-full pl-8 focus:border-green-300 mt-1"
                placeholder="Enter your names"
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.name ? errors.name.message : ""}
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

          <div className="flex flex-col w-full ">
            <div className="flex gap-1 w-full items-center justify-center ">
              <CiFileOn color="green" className="sm:text-xl" />
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUploadedProfileImgDisplay(e)
                }
                // {...register("profile_img")}
                name="profile_img"
                type="file"
                accept="image/*"
                className="outline-none cursor-pointer sm:text-base text-xs"
              />

              <div className="w-6 h-6">
                {uploadProfileUrl ? (
                  <img
                    src={uploadProfileUrl}
                    // width={25}
                    // height={25}

                    loading="lazy"
                    className="rounded-full object-fill"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <p className="text-xs text-red-500">
              {/* {errors.profile_img ? errors.profile_img.message : ""} */}
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="py-2 rounded-full w-fit px-5 text-white/70 font-semibold bg-[#28C8C8]"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4">
          Already registered,{" "}
          <Link to="/login" className="text-green-600 font-semibold ">
            Login
          </Link>
        </p>
      </div>

      {/* loading modal */}
      {status === "loading" && <LoadingModal />}
    </div>
  );
}

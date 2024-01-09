import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import SVGChatComponent from "../../svgComponent/ChatIcon";
import { GoPerson } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserCircle2 } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../../zodTypes/registerType";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  type registerType = z.infer<typeof registerSchema>;
  const { register, handleSubmit } = useForm<registerType>();

  const handleOnSubmit = () => {};

  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4 drop-shadow-md">
        <div className="flex justify-center items-center ">
          <SVGChatComponent color="green" className="w-[100px] h-[100px]" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="flex gap-1 w-full items-center justify-center relative">
            <GoPerson color="green" className="absolute left-2" />
            <input
              {...register("name")}
              name="name"
              type="text"
              className="p-2 border-b outline-none w-full placeholder:pl-5 focus:border-green-300 mt-1"
              placeholder="Enter your names"
            />
          </div>

          <div className="flex gap-1 w-full items-center justify-center relative">
            <LuUserCircle2 color="green" className="absolute left-2" />
            <input
              {...register("username")}
              name="username"
              type="text"
              className="p-2 border-b outline-none w-full placeholder:pl-5 focus:border-green-300 mt-1"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex gap-1 w-full items-center justify-center relative">
            <MdAlternateEmail color="green" className="absolute left-2" />
            <input
              {...register("email")}
              name="email"
              type="email"
              className="p-2 border-b outline-none w-full placeholder:pl-5 focus:border-green-300 mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex gap-1 w-full items-center justify-center relative">
            <RiLockPasswordLine color="green" className="absolute left-2" />
            <input
              {...register("password")}
              name="password"
              type={`${!showPassword ? "password" : "text"}`}
              className="p-2 border-b outline-none w-full placeholder:pl-5 focus:border-green-300 mt-1"
              placeholder="Enter your correct password"
            />

            <AiOutlineEye
              className="absolute right-1 top-5 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          <div className="flex gap-1 w-full items-center justify-center">
            <CiFileOn color="green" className="text-xl" />
            <input
              {...register("profile_img")}
              name="profile_img"
              type="file"
              className="outline-none w-full placeholder:pl-5 cursor-pointer"
              placeholder="Enter your correct password"
            />
            <img src="" width={10} height={10} loading="lazy" />
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
          {" "}
          Already registered,{" "}
          <Link to="/login" className="text-green-600 font-semibold ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import {
  isPasswordAlreadyTaken,
  isEmailAlreadyUsed,
} from "../utils/comparePassword";
import { UserModel } from "../models/Users";
import { registercredentialValidation } from "../utils/authDataValidation";
import { isRegisteredEmail } from "../utils/isRegisteredEmail";
import { isNameAlreadyReqistered } from "../utils/isNameRegistered";
import jwt from "jsonwebtoken";
import { exist, string } from "joi";
import { createToken } from "../utils/createToken";
import UserProfile from "../models/UserProfile";
import mongoose from "mongoose";
import { Console, log, profile } from "console";
import { randomBytes, randomUUID } from "crypto";
import { sendMail } from "../utils/sendMail";
import { generateRandomPIN } from "../utils/generateRandomPin";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, surname, password, profile_img } = req.body;
    const hashedPassword = await hashPassword(password);
    const isPasswordAlreadyUsed = await isPasswordAlreadyTaken(password);
    const isEmailUsed = await isEmailAlreadyUsed(email);

    const validationResult = await registercredentialValidation(
      name,
      email,
      password,
      surname
    );

    if (validationResult.error) {
      // Handle validation error
      return res.json({
        error: true,
        showMessage: true,
        message: validationResult.error.message,
      });
    }

    // console.log(isPasswordAlreadyUsed, isEmailUsed, hashedPassword);

    if (isPasswordAlreadyUsed === false && isEmailUsed === false) {
      const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        profile_img: profile_img,
      });
      const user = await newUser.save();

      res.cookie("user", user, {});

      return res.status(201).json({
        error: false,
        showMessage: true,
        message: "New user created successfully",
        // data: userAndProfile,
      });
    } else {
      // session.endSession();
      console.log("user Already registered");
      return res.status(400).json({
        error: true,
        showMessage: true,
        message: "user Already registered",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      showMessage: false,
      message: (error as Error).message,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const validationResult = await registercredentialValidation(
      name,
      email,
      "Password@123"
    );

    if (validationResult.error) {
      // Handle validation error
      console.log("validation error");
      return res.json({
        error: true,
        showMessage: true,
        message: validationResult.error.message,
      });
    }

    const new_Email = await isRegisteredEmail(email);
    if (new_Email === false) {
      console.log("The email is not yet registered");
      return res.json({
        error: true,
        showMessage: true,
        message: "The email is not yet registered",
      });
    }

    const checkNameAlreadyRegistered = await isNameAlreadyReqistered(name);
    if (checkNameAlreadyRegistered === false) {
      console.log("The name is not yet registered");
      return res.json({
        error: true,
        showMessage: true,
        message: "The name is not yet registered",
      });
    }
    const token = await createToken(email);
    // console.log(token);
    // const user_id = await UserModel.findOne({ email }, "_id");
    // const userProfile = await UserProfile.findOne({
    //   user_id: user_id?._id,
    // }).populate("user_id");

    const user = await UserModel.findOne({ email: email });

    // check whether the user is real by checking for OTP status
    // if (user?.confirm_otp == false) {
    //   return res.json({
    //     error: true,
    //     showMessage: true,
    //     message: "Otp unconfirmed",
    //   });
    // }

    res.cookie("token", token, {
      maxAge: 300000,
      secure: true,
      httpOnly: false,
    });
    res.cookie("user", JSON.stringify(user));
    res.cookie("token", token, {
      maxAge: 300000,
      secure: true,
      httpOnly: false,
    });
    return res.json({
      success: true,
      showMessage: false,
      message: "login successful",
    });
  } catch (error) {
    return res.json({
      error: true,
      showMessage: false,
      message: (error as Error).message,
    });
  }
};

export const ConfirmOtp = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    const formatOtp = otp.split(",").join("");
    // console.log(formatOtp);

    const confirmOtp = await UserModel.findOne({
      email: email,
      otp: formatOtp,
    });

    // console.log(confirmOtp);

    if (!confirmOtp) {
      return res.status(500).json({
        error: true,
        showMessage: true,
        message: "User/Otp not found",
      });
    } else {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: email },
        { confirm_otp: true },
        { new: false } // This option returns the updated document
      );
      console.log(updatedUser);
      res.cookie("user", JSON.stringify(updatedUser));

      return res
        .status(200)
        .json({ error: false, showMessage: true, message: "Otp confirm" });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      showMessage: false,
      message: (error as Error).message,
    });
  }
};

export const refresh_token = async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    //  1. check whether the user exist
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      // The user with the specified email exists
      // You can add your logic here
      const token = await createToken(email);
      // console.log(token);
      res.cookie("token", token, {
        maxAge: 300000,
        secure: true,
        httpOnly: false,
      });
      return res.status(200).json({
        error: false,
        showMessage: true,
        message: "token created successful",
        data: token,
      });
    } else {
      // The user with the specified email does not exist
      // You can add your logic here
      return res.status(400).json({
        error: true,
        showMessage: false,
        message: "User doesn't exist",
        data: "",
      });
    }
  } catch (error) {
    // Handle any errors, such as a database connection issue
    console.error(`Error checking if the user exists: ${error}`);
    return res.status(200).json({
      error: true,
      showMessage: false,
      message: (error as Error).message,
    });
  }
};

export const MiddlewareTesting = async (req: Request, res: Response) => {
  try {
    return res.json({
      error: false,
      showMessage: true,
      message: "hello world from the middleware testing",
    });
  } catch (error: any) {
    return res.json({
      error: true,
      showMessage: true,
      message: error.message,
    });
  }
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary";
import AuthModel from "../model/AuthModel";
import { STATUSCODE } from "../error/ErrorNotifier";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const user = await AuthModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res
      .status(STATUSCODE.CREATE)
      .json({ message: "user created", data: user });
  } catch (error: any) {
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error creating user", data: error });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await AuthModel.findOne({ email });
    if (user) {
      const hashed = await bcrypt.compare(password, user?.password!);
      if (hashed) {
        return res
          .status(STATUSCODE.CREATE)
          .json({ message: `welcome back ${user.name}`, data: user._id });
      } else {
        return res
          .status(STATUSCODE.BAD)
          .json({ message: "password is not correct" });
      }
    } else {
      return res
        .status(STATUSCODE.BAD)
        .json({ message: "Email isn't correct" });
    }
  } catch (error) {
    return res.status(STATUSCODE.BAD).json({ message: "Error signing user" });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await AuthModel.findById(userID);
    return res
      .status(STATUSCODE.OK)
      .json({ message: "get all users", data: user });
  } catch (error) {
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error viewing one user" });
  }
};

export const viewUsers = async (req: Request, res: Response) => {
  try {
    const user = await AuthModel.find();
    return res
      .status(STATUSCODE.OK)
      .json({ message: "get all Users", data: user });
  } catch (error) {
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error getting all users" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await AuthModel.findByIdAndDelete(userID);

    return res
      .status(STATUSCODE.OK)
      .json({ message: "successfully deleted user", data: user });
  } catch (error: any) {
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error deleting user", data: error.message });
  }
};

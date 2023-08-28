import { Request, Response } from "express";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary";
import AdminModel from "../model/AdminModel";
import { STATUSCODE } from "../error/ErrorNotifier";

export const registerAdmin = async (req: any, res: Response) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(adminPassword, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );

    const user = await AdminModel.create({
      adminName,
      adminEmail,
      adminPassword: hashed,
      adminAvatar: secure_url,
      adminAvatarID: public_id,
    });

    return res
      .status(STATUSCODE.CREATE)
      .json({ message: "user created", data: user });
  } catch (error: any) {
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error", data: error.message });
  }
};

export const signInAdmin = async (req: Request, res: Response) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    const admin = await AdminModel.findOne({ adminEmail });
    if (admin) {
      const hashed = await bcrypt.compare(adminPassword, admin?.adminPassword!);

      if (hashed) {
        return res.status(STATUSCODE.CREATE).json({
          message: `welcome back ${admin.adminName}`,
          data: admin._id,
        });
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
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error signing in user" });
  }
};

export const viewOneAdmin = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;

    const admin = await AdminModel.findById(adminID);

    return res
      .status(STATUSCODE.OK)
      .json({ message: "view one admin", data: admin });
  } catch (error: any) {
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error", data: error.message });
  }
};

export const viewAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.find();
    return res
      .status(STATUSCODE.OK)
      .json({ message: "view Admin", data: admin });
  } catch (error) {
    return res.status(STATUSCODE.BAD).json({ message: "Error" });
  }
};

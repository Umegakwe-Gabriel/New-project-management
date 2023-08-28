import mongoose from "mongoose";
import { iAdmin, iAdminData } from "../utils/interface";

export const adminModel = new mongoose.Schema<iAdmin>(
  {
    adminName: {
      type: String,
    },
    adminEmail: {
      type: String,
      unique: true,
      trim: true,
    },
    adminPassword: {
      type: String,
    },
    adminAvatar: {
      type: String,
    },
    adminAvatarID: {
      type: String,
    },
    task: [
      {
        type: mongoose.Types.ObjectId,
        ref: "tasks",
      },
    ],
    progress: [
      {
        type: mongoose.Types.ObjectId,
        ref: "tasks",
      },
    ],
    done: [
      {
        type: mongoose.Types.ObjectId,
        ref: "tasks",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iAdminData>("admins", adminModel);

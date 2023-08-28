import mongoose from "mongoose";
import { iUser, iUserData } from "../utils/interface";

const usermodel = new mongoose.Schema<iUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
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

export default mongoose.model<iUserData>("users", usermodel);

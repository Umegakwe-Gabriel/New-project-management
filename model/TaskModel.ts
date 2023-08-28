import mongoose from "mongoose";
import { iTask, iTaskData } from "../utils/interface";

const taskModel = new mongoose.Schema<iTask>(
  {
    name: {
      type: String,
    },
    task: {
      type: String,
    },
    taskAvatar: {
      type: String,
    },
    priority: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "admins",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iTaskData>("tasks", taskModel);

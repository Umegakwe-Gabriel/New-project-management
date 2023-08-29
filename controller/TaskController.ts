import mongoose from "mongoose";
import { Request, Response } from "express";
import TaskModel from "../model/TaskModel";
import AuthModel from "../model/AuthModel";
import AdminModel from "../model/AdminModel";
import { STATUSCODE } from "../error/ErrorNotifier";

export const createUsersTask = async (req: Request, res: Response) => {
  try {
    const { adminID, userID } = req.params;
    const { task, priority } = req.body;
    const user = await AuthModel.findById(userID);
    const admin = await AdminModel.findById(adminID);

    const tasked = await TaskModel.create({
      task,
      priority,
      name: user?.name,
      taskAvatar: user?.avatar,
    });

    admin?.task?.push(new mongoose.Types.ObjectId(tasked._id));
    admin?.save();

    user?.task?.push(new mongoose.Types.ObjectId(tasked._id));
    user?.save();

    return res.status(STATUSCODE.CREATE).json({
      message: "tasks created",
      data: tasked,
    });
  } catch (error: any) {
    return res.status(STATUSCODE.BAD).json({
      message: "error occured",
      data: error.message,
    });
  }
};

export const viewOneTask = async (req: Request, res: Response) => {
  try {
    const { taskID } = req.params;

    const tasked = await TaskModel.findById(taskID);

    return res.status(STATUSCODE.OK).json({
      message: "view users task",
      data: tasked,
    });
  } catch (error: any) {
    return res.status(STATUSCODE.BAD).json({
      message: "error occured",
      data: error.message,
    });
  }
};

export const viewTask = async (req: Request, res: Response) => {
  try {
    const tasked = await TaskModel.find();

    return res.status(STATUSCODE.OK).json({
      message: "view users task",
      data: tasked,
    });
  } catch (error: any) {
    return res.status(STATUSCODE.BAD).json({
      message: "error occured",
      data: error.message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskID } = req.params;
    const task = await TaskModel.findByIdAndDelete(taskID);

    return res
      .status(STATUSCODE.OK)
      .json({ message: "successfully deleted task", data: task });
  } catch (error: any) {
    return res
      .status(STATUSCODE.BAD)
      .json({ message: "Error deleting user", data: error.message });
  }
};
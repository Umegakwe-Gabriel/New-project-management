import mongoose from "mongoose";

export interface iAdmin {
  adminName?: string;
  adminEmail?: string;
  adminPassword?: string;
  adminAvatar?: string;
  adminAvatarID?: string;
  task?: {}[];
  progress?: {}[];
  done: {}[];
}

export interface iUser {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  avatarID?: string;
  task?: {}[];
  progress?: {}[];
  done: {}[];
}

export interface iTask {
  name?: string;
  taskAvatar?: string;
  admin?: {};
  user?: {};
  task?: string;
  priority?: string;
}

export interface iTaskData extends iTask, mongoose.Document {};

export interface iAdminData extends iAdmin, mongoose.Document {};

export interface iUserData extends iUser, mongoose.Document {};

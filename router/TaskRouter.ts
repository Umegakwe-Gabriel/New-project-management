import { Router } from "express";
import {
  createUsersTask,
  deleteTask,
  viewOneTask,
  viewTask,
} from "../controller/TaskController";

const tasked: Router = Router();

tasked.route("/:adminID/:userID/create-task").post(createUsersTask);
tasked.route("/:taskID/view-task").get(viewOneTask);
tasked.route("/view-task").get(viewTask);
tasked.route("/:taskID/delete-task").delete(deleteTask);

export default tasked;

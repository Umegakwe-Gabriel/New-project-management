import { Router } from "express";
import { createUsersTask, viewOneTask } from "../controller/TaskController";

const tasked: Router = Router();

tasked.route("/:adminID/:userID/create-task").post(createUsersTask);
tasked.route("/:taskID/view-task").get(viewOneTask);

export default tasked;

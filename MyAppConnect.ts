import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { ErrorNotifier, STATUSCODE } from "./error/ErrorNotifier";
import { errorHost } from "./error/ErrorHost";
import admin from "./router/AdminRouter";
import user from "./router/UserRouter";
import tasked from "./router/TaskRouter";

export const myAppConnect = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(STATUSCODE.OK).json({
        message: "The work is ready for delivery",
      });
    } catch (error) {
      return res.status(STATUSCODE.BAD).json({
        message: "Error",
      });
    }
  });
  app.use("/api/admin", admin);
  app.use("/api/user", user);
  app.use("/api/task", tasked);

  app
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      new ErrorNotifier({
        errorName: "URL Error",
        errorMessage: `This error came due to ${req.originalUrl} is wrong`,
        errorStatus: STATUSCODE.BAD,
        success: false,
      });
    })
    .use(errorHost);
};

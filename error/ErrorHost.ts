import { ErrorNotifier, STATUSCODE } from "./ErrorNotifier";
import { NextFunction, Request, Response } from "express";

const errorField = (err: ErrorNotifier, res: Response) => {
    return res.status(STATUSCODE.BAD).json({
        errorName: err.errorName,
        errorMessage: err.errorMessage,
        errorStatus: err.errorStatus,
        success: err.success,
        stack: err.stack,
        err
    })
}

export const errorHost = (err: ErrorNotifier, req: Request, res: Response, next: NextFunction) => {
    errorField(err, res)
}
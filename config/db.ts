import mongoose from "mongoose";
import { envVariables } from "./envVariables";

const URL: string = envVariables.DATA_BASE;

export const DBConfig = () => {
  mongoose.connect(URL).then(() => {
    console.log("connected💯💯");
  });
};

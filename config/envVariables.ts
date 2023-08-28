import env from "dotenv"
env.config();

export const envVariables = {
    PORT:  process.env.PORT!,
    DATA_BASE: process.env.DATA_BASE!,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_KEY: process.env.CLOUD_KEY,
    CLOUD_SECRET: process.env.CLOUD_SECRET
}
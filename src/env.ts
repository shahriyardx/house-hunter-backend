import dotenv from "dotenv"

dotenv.config()

export const MONGO_URL = process.env.MONGO_URL as string
export const PORT = Number(process.env.PORT || 5000)

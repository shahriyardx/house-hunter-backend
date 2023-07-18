import dotenv from "dotenv"

dotenv.config()

export const MONGO_URL = process.env.MONGO_URL as string
export const PORT = Number(process.env.PORT || 5000)
export const NODE_ENV = process.env.NODE_ENV
export const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not present in .env")
}

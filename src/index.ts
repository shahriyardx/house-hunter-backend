import app from "./app"
import dotenv from "dotenv"
import { Request, Response } from "express"
import mongoose from "mongoose"
import { MONGO_URL } from "./env"

dotenv.config()

app.get("/", (_req: Request, res: Response) => {
  return res.json({ message: "backend service is live" })
})

const PORT = process.env.PORT || 5000

const main = async () => {
  try {
    await mongoose.connect(String(MONGO_URL))
  } catch (err) {
    console.log("[x] failed to connect to mongodb \n", err)
    return
  }

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
}

main()

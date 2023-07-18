import app from "./app"
import dotenv from "dotenv"
import { Request, Response } from "express"

dotenv.config()

app.get("/", (_req: Request, res: Response) => {
  return res.json({ message: "backend service is live" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})

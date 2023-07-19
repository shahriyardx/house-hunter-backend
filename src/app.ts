import Express from "express"
import cors from "cors"

import authRouter from "./routers/auth"
import { globalErrorHandler } from "./handlers/globalErrorHandler"
import ownerRouter from "./routers/owner"
import { requireOwner } from "./middlewares/jwt"

const app = Express()
app.use(cors())
app.use(Express.json())

// routers
app.use("/auth", authRouter)
app.use("/owner", requireOwner, ownerRouter)
app.use(globalErrorHandler)

export default app

import Express from "express"
import cors from "cors"

import authRouter from "./routers/auth"
import { globalErrorHandler } from "./handlers/globalErrorHandler"
import ownerRouter from "./routers/owner"
import { requireOwner, requireRenter } from "./middlewares/jwt"
import publicRouter from "./routers/public"
import renterRouter from "./routers/renter"

const app = Express()
app.use(cors())
app.use(Express.json())

// routers
app.use("/", publicRouter)
app.use("/auth", authRouter)
app.use("/owner", requireOwner, ownerRouter)
app.use("/renter", requireRenter, renterRouter)

app.use(globalErrorHandler)

export default app

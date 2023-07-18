import { Router } from "express"
import { registerSchema } from "../schema/user"

const router = Router()

router.post("/register", async (req, res, next) => {
  const data = req.body
  let registerData
  try {
    registerData = await registerSchema.parseAsync(data)
  } catch (err) {
    return next(err)
  }

  res.json(registerData)
})

export default router

import { Router } from "express"
import { registerSchema } from "../schema/user"
import { genPasswordHash } from "../utils"
import { User } from "../models/User"

const router = Router()

router.post("/register", async (req, res, next) => {
  const data = req.body
  let registerData
  try {
    registerData = await registerSchema.parseAsync(data)
  } catch (err) {
    return next(err)
  }

  const userExists = await User.findOne({ email: registerData.email })
  if (userExists) {
    return res.status(409).json({
      status: "error",
      message: "another account with this email exists",
    })
  }

  const { name, email, role, password } = registerData
  const password_hash = genPasswordHash(password)
  const userData = { name, email, role, password_hash }
  await User.create(userData)
  res.json({
    status: "success",
    message: "registration succesful",
  })
})

export default router

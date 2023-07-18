import { Router } from "express"
import { loginSchema, registerSchema } from "../schema/user"
import { compareHash, genPasswordHash, generateAccessToken } from "../utils"
import { User } from "../models/User"

const router = Router()

router.post("/login", async (req, res, next) => {
  const data = req.body
  let loginData
  try {
    loginData = await loginSchema.parseAsync(data)
  } catch (err) {
    return next(err)
  }

  const userExists = await User.findOne({ email: loginData.email })
  if (!userExists) {
    return res.status(409).json({
      status: "error",
      message: "invalid email or password",
    })
  }

  const passwordValid = compareHash(
    loginData.password,
    userExists.password_hash
  )

  if (!passwordValid) {
    return res
      .status(403)
      .json({ status: "error", message: "invalid email or password" })
  }

  return res.json({
    status: "success",
    message: "login succesfull",
    role: userExists.role,
    accessToken: generateAccessToken({
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
    }),
  })
})

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

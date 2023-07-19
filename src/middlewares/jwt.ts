import { NextFunction, Request, Response } from "express"
import { User } from "../models/User"
import { decodeAccessToken } from "../utils"

export const requireOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization as string
  const decoded = decodeAccessToken(auth)

  if (decoded) {
    if (decoded.role === "owner") {
      const user = await User.findOne({ email: decoded.email, role: "owner" })
      if (!user) {
        return res.json({ status: "error", message: "you are not authorized" })
      }

      return next()
    }

    return res.json({ status: "error", message: "you are not authorized" })
  }

  return res.json({ status: "error", message: "you are not authorized" })
}

export const requireRenter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization as string
  const decoded = decodeAccessToken(auth)

  if (decoded) {
    if (decoded.role === "customer") {
      const user = await User.findOne({
        email: decoded.email,
        role: "customer",
      })
      if (!user) {
        return res.json({ status: "error", message: "you are not authorized" })
      }

      return next()
    }

    return res.json({ status: "error", message: "you are not authorized" })
  }

  return res.json({ status: "error", message: "you are not authorized" })
}

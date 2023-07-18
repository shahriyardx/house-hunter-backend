import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./env"

export const genPasswordHash = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

export const compareHash = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}

type Payload = {
  name: string
  email: string
  role: string
}

export const generateAccessToken = (payload: Payload) => {
  const token = jwt.sign(payload, JWT_SECRET as string)
  return token
}

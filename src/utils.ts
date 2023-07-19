import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./env"
import { User } from "./models/User"

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

export const decodeAccessToken = (auth: string) => {
  let token
  try {
    token = auth.split("Bearer")[1].trim()
  } catch {
    return null
  }

  const decode = jwt.decode(token) as {
    name: string
    email: string
    role: string
  }

  return decode
}

export const getUser = async (auth: string) => {
  const decoded = decodeAccessToken(auth)
  const user = await User.findOne({ email: decoded?.email })

  return user
}

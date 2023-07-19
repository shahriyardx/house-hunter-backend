import { Router } from "express"
import { houseCreateSchema } from "../schema/house"
import { House } from "../models/House"
import { getUser } from "../utils"

const ownerRouter = Router()

ownerRouter.post("/house/add", async (req, res, next) => {
  const data = req.body
  let houseData
  try {
    houseData = await houseCreateSchema.parseAsync(data)
  } catch (err) {
    return next(err)
  }

  const user = await getUser(req.headers.authorization as string)
  if (!user) {
    return res
      .status(403)
      .json({ status: "error", message: "you are not authorized" })
  }

  const da = await House.create({ ...houseData, owner: user?.id })
  res.json(da)
})

export default ownerRouter

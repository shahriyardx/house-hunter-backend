import { Router } from "express"
import { houseCreateSchema } from "../schema/house"
import { House } from "../models/House"
import { getUser } from "../utils"

const ownerRouter = Router()

ownerRouter.get("/house/all", async (req, res) => {
  const user = await getUser(req.headers.authorization as string)
  const houses = await House.find({
    owner: user?._id,
  })

  res.json(houses)
})

ownerRouter.get("/house/:id", async (req, res) => {
  const house = await House.findById(req.params.id)
  res.json({ status: house ? "success" : "error", message: "", data: house })
})

ownerRouter.patch("/house/edit/:id", async (req, res, next) => {
  const data = req.body
  let houseData
  try {
    houseData = await houseCreateSchema.parseAsync(data)
  } catch (err) {
    return next(err)
  }

  await House.findByIdAndUpdate(req.params.id, houseData)
  res.json({ status: "success", message: "House updated" })
})

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
  res.json({ status: "success", message: "House added", data: da })
})

export default ownerRouter

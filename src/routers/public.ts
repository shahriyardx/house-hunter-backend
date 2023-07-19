import { Router } from "express"
import { House } from "../models/House"

const publicRouter = Router()

publicRouter.get("/houses", async (req, res) => {
  const query = req.query
  const search = query.query || ""
  console.log(search)

  const totalHouses = await House.countDocuments({ name: { $regex: search } })
  const houses = await House.find({
    name: { $regex: search },
  }).limit(10)

  res.json({ status: "success", message: "", data: { houses, totalHouses } })
})

export default publicRouter

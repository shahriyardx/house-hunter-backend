import { Router } from "express"
import { Booking } from "../models/Bookings"
import { getUser } from "../utils"

const renterRouter = Router()

renterRouter.get("/book", async (req, res) => {
  const user = await getUser(req.headers.authorization as string)
  if (!user) {
    return res
      .status(403)
      .json({ status: "error", message: "you are not authorized" })
  }

  const bookings = await Booking.find({ renter: user._id }).populate(["house"])
  res.json({ status: "success", data: bookings })
})

renterRouter.delete("/book/:bookId", async (req, res) => {
  const user = await getUser(req.headers.authorization as string)
  if (!user) {
    return res
      .status(403)
      .json({ status: "error", message: "you are not authorized" })
  }

  await Booking.findByIdAndDelete(req.params.bookId)
  res.json({ status: "success", message: "booking deleted" })
})

renterRouter.post("/book/:houseId", async (req, res) => {
  const user = await getUser(req.headers.authorization as string)
  if (!user) {
    return res
      .status(403)
      .json({ status: "error", message: "you are not authorized" })
  }

  const bookings = await Booking.find({ renter: user._id }).populate(["house"])
  if (bookings.length >= 2) {
    return res
      .status(409)
      .json({ status: "error", message: "maximum bookings reached" })
  }

  await Booking.create({
    house: req.params.houseId,
    renter: user._id,
  })

  res.json({ status: "success", message: "booking completed" })
})

export default renterRouter

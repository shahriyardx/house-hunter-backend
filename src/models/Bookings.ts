import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

export const Booking = mongoose.model("Booking", BookingSchema)

import mongoose from "mongoose"

const HouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  room_size: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  availability_date: {
    type: Date,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

export const House = mongoose.model("House", HouseSchema)

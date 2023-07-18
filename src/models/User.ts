import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "owner"],
  },
  password_hash: {
    type: String,
    required: true,
  },
})

export const User = mongoose.model("User", UserSchema)

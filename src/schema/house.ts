import z from "zod"

export const houseCreateSchema = z.object({
  name: z.string({
    invalid_type_error: "name must be string",
    required_error: "name is required",
  }),
  address: z.string({ required_error: "address is required" }),
  city: z.string({ required_error: "city is required" }),
  room_size: z.string({ required_error: "room size is required" }),
  description: z.string({ required_error: "description is required " }),
  bedrooms: z
    .number({ required_error: "bedrooms is required" })
    .min(1, { message: "minimum 1 room is required" }),
  bathrooms: z
    .number({ required_error: "bathrooms is required" })
    .min(1, { message: "minimum 1 bnathroom is required" }),
  availability_date: z.string({ required_error: "date is required" }),
  rent: z.number().min(100, { message: "minimum rent is 100" }),
  contact_number: z.string({ required_error: "contact number is required" }),
  image_url: z.string({ required_error: "image is required" }),
})

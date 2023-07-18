import { ZodError } from "zod"
import { GlobalErrorObject } from "../types"

const handle = (err: ZodError) => {
  const path = String(err.errors[0].path[0])
  const message = err.errors[0].message

  const error: GlobalErrorObject = { status: "error", path, message }

  if (process.env.NODE_ENV === "development") {
    error["stack"] = err.stack
  }

  return error
}

export default handle

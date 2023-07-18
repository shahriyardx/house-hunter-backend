import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import handleZodError from "./handleZodError"

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof ZodError) {
    return res.status(400).json(handleZodError(err))
  }

  return res.status(500).send("Something went wrong")
}

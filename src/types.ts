export type GlobalErrorObject = {
  status: "success" | "error"
  path: string
  message: string
  stack?: string
}

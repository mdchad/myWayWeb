import { createAuthClient } from "better-auth/react"

// @ts-ignore
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000" // the base url of your auth server
})
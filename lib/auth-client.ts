import { createAuthClient } from "better-auth/react"

// @ts-ignore
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL // the base url of your auth server
})
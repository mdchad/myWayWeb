import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// @ts-ignore
const authClient =  new MongoClient(process.env.MONGODB_URI);

const db = authClient.db()

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true
  },
});